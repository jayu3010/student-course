const mongoose = require('mongoose');
const branchdetails = require('../model/branch');

// Get all branch details
exports.getbranchdetails = async (req, res) => {
    try {
        let data = await branchdetails.find();
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Branch List Get Successfully',
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

// Get branch details by ID
exports.getbranchdetailsbyid = async (req, res) => {
    var id = req?.body?.id;
    try {
        let data = await branchdetails.findById({ _id: id });
        console.log(data);
        res.json({
            code: 200,
            data: data,
            status: 'Branch Details Get Successfully',
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

// Add a new branch
exports.addbranch = async (req, res) => {
    try {
        let crud = new branchdetails({
            branch_name: req.body.branch_name,
        });
        var data = await crud.save();
        console.log("data", data);
        res.json({
            code: 200,
            data: data,
            status: 'Branch Added Successfully',
        });
    } catch (err) {
        res.json({
            code: 400,
            status: "failed",
            message: err,
        });
    }
};
