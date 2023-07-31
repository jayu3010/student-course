const mongoose = require('mongoose');
const studentdetails = require('../model/studentModel');
const feesdetails = require('../model/studentFeesModal');

// Get all student details
exports.getStudentdetails = async (req, res) => {
    try {
        let data = await studentdetails.find();
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Student List Get Successfully',
        });
    } catch (err) {
        console.log("error", err);
        res.json({
            code: 400,
            status: "failed",
            message: "Something Wrong",
        });
    }
};

// Get student details by ID
exports.getStudentDetailsbyid = async (req, res) => {
    var id = req?.body?.id;
    try {
        let data = await studentdetails.findById({ _id: id }).populate('course');
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Student Get Successfully',
        });
    } catch (err) {
        console.log("error", err);
        res.json({
            code: 400,
            status: "failed",
            message: "Something Wrong",
        });
    }
};

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        let crud = new studentdetails({
            // Map request body properties to corresponding schema fields
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            gender: req.body.gender,
            mobile_no: req.body.mobile_no,
            address: req.body.address,
            email: req.body.email,
            pincode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            branch: req.body.branch,
            course: req.body.course,
            batch: req.body.batch,
            status: req.body.status,
        });
        var data = await crud.save();
        console.log("data", data);
        res.json({
            code: 200,
            data: data,
            status: 'Student Added Successfully',
        });
    } catch (err) {
        res.json({
            code: 400,
            status: "failed",
            message: err,
        });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    var id = req?.body?.id;
    var id2 = req?.query?.id; // Access the id from URL parameters
    var id3 = req?.params?.id; // Access the id from URL parameters

    console.log("in backend", id2, id3);
    try {
        let data = await studentdetails.findByIdAndRemove({ _id: id });
        console.log(data);
        res.json({
            code: 200,
            status: 'Student Deleted Successfully',
        });
    } catch (err) {
        console.log("error", err);
        res.json({
            code: 400,
            status: "failed",
            message: "Something Wrong",
        });
    }
};

// Get student report by branch and status
exports.getStudentReport = async (req, res) => {
    const branch = req?.body?.branch;
    const status = req?.body?.status;

    try {
        // Find students with the specified branch and status
        const students = await studentdetails.find({
            branch: branch,
            status: status,
        });

        // Get fees information for the matched students
        const studentsWithFees = await Promise.all(
            students.map(async (student) => {
                const feesInfo = await feesdetails.findOne({
                    student_id: student._id,
                });

                return {
                    student_name: `${student.fname} ${student.lname}`,
                    branch: student.branch,
                    mobile_no: student.mobile_no,
                    fees_amt: feesInfo ? feesInfo.fees_amt : "N/A",
                    paid_amt: feesInfo ? feesInfo.paid_amt : "N/A",
                    balance: feesInfo ? feesInfo.balance : "N/A",
                };
            })
        );

        res.json({
            code: 200,
            data: studentsWithFees,
            status: "Student Report Generated Successfully",
        });
    } catch (err) {
        console.log("error", err);
        res.json({
            code: 400,
            status: "failed",
            message: "Something went wrong",
        });
    }
};
