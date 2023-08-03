const mongoose = require("mongoose");
const feesdetails = require('../model/studentFeesModel');
const moment = require('moment')

// Get all fees details
exports.getfeesdetails = async (req, res) => {
    try {
        let data = await feesdetails.find();
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Fees List Get Successfully',
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

// Get fees details by student ID
exports.getfeesbyStudentId = async (req, res) => {
    var id = req.body.student_id;
    try {
        // Use the 'id' variable in the query to find feesdetails by student_id
        let data = await feesdetails.find({ student_id: id }).populate('student_id').populate('course');
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Fees List Get Successfully',
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

// Add fees for a student
exports.addfees = async (req, res) => {
    console.log("req", req.body)
    try {
        let paid_date_student = moment.utc(req?.body?.paid_date)
        let crud = new feesdetails({
            paid_date: paid_date_student,
            course: req.body.course,
            student_id: req.body.student_id,
            fees_amt: req.body.fees_amt,
            discount: req.body.discount,
            net_amt: req.body.net_amount,
            tax: req.body.tax,
            total_due: req.body.total_due,
            paid_amt: req.body.paid_amt,
            balance: req.body.balance,
        });
        var data = await crud.save();
        console.log("data", data);
        res.json({
            code: 200,
            data: data,
            status: 'Fees Added Successfully',
        });
    } catch (err) {
        res.json({
            code: 400,
            status: "failed",
            message: err,
        });
    }
};
exports.updateFees = async (req, res) => {
    try {
        const id = req.body.student_id;

        // Find the fees_model document by student_id
        const feesDetail = await feesdetails.findOne({ student_id: id });

        if (!feesDetail) {
            return res.status(404).json({
                code: 404,
                status: "failed",
                message: "Student with the given ID not found",
            });
        }
        let paid_date_student = moment.utc(req?.body?.paid_date)
        if (req.body.paid_date) {
            feesDetail.paid_date = paid_date_student;
        }

        if (req.body.net_amt) {
            feesDetail.net_amt = req.body.net_amt;
        }
        if (req.body.tax) {
            feesDetail.tax = req.body.tax;
        }
        if (req.body.total_due) {
            feesDetail.total_due = req.body.total_due;
        }
        if (req.body.paid_amt) {
            feesDetail.paid_amt = req.body.paid_amt;
        }
        if (req.body.balance) {
            feesDetail.balance = req.body.balance;
        }
        // Update the fields if provided in the request body
        if (req.body.course) {
            feesDetail.course = req.body.course;
        }
        if (req.body.fees_amt) {
            feesDetail.fees_amt = req.body.fees_amt;
        }
        if (req.body.discount) {
            feesDetail.discount = req.body.discount;
        }
        // Add other fields to be updated similarly

        // Save the updated document
        const updatedFeesDetail = await feesDetail.save();

        return res.json({
            code: 200,
            data: updatedFeesDetail,
            status: "Student Fees Updated Successfully",
        });
    } catch (err) {
        console.log("errrr", err);
        res.json({
            code: 400,
            status: "failed",
            message: err.message,
        });
    }
};