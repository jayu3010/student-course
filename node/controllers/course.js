const mongoose = require('mongoose');
const coursedetails = require('../model/studentCourse');

// Get all course details
exports.getcoursedetails = async (req, res) => {
    try {
        let data = await coursedetails.find();
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Course List Get Successfully',
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

// Get course details by ID
exports.getcoursedetailsbyid = async (req, res) => {
    var id = req?.body?.id;
    try {
        let data = await coursedetails.findById({ _id: id });
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Course Details Get Successfully',
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

// Add a new course
exports.addcourse = async (req, res) => {
    try {
        let crud = new coursedetails({
            course_name: req.body.course_name,
        });
        var data = await crud.save();
        console.log("data", data);
        res.json({
            code: 200,
            data: data,
            status: 'Course Added Successfully',
        });
    } catch (err) {
        res.json({
            code: 400,
            status: "failed",
            message: err,
        });
    }
};
