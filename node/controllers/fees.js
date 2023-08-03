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
    console.log("req",req.body)
    try {
        let paid_date_student = moment.utc(req?.body?.paid_date)
    console.log("paid_date",paid_date)
        let crud = new feesdetails({
            paid_date: paid_date,
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
