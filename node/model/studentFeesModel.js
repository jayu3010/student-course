
const mongoose = require("mongoose");


var Schema = mongoose.Schema

const fees_modal = new Schema({
    paid_date: { type: Date },
    course: { type: Schema.Types.ObjectId, ref: 'course_model' },
    student_id: { type: Schema.Types.ObjectId, ref: 'student_model' },
    fees_amt: { type: String },
    discount: { type: String },
    net_amt: { type: String },
    tax: { type: String },
    total_due: { type: String },
    paid_amt: { type: String },
    balance: { type: String },


});

module.exports = mongoose.model('fees_model', fees_modal);
