const mongoose = require("mongoose");


var Schema=mongoose.Schema

const branch_model = new Schema({
   branch_name: {type: String},


});

module.exports = mongoose.model('branch', branch_model);
