const mongoose = require("mongoose");


var Schema=mongoose.Schema

const course_model = new Schema({
   course_name: {type: String},


});

module.exports = mongoose.model('course_model', course_model);
