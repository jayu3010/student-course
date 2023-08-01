const mongoose = require("mongoose");
const genderEnum = ['M', 'F']
const cityEnum = ["Ahemdabad", "Baroda", "Surat"]
const stateEnum = ["Gujarat", "TamilNadu", "Delhi"]
const branchEnum = ["Bandra", "Kandlivali", "Andheri", "Surat","Vadodara","Chennai"]
const batchEnum = ["Morning", "Noon",  "Evening"]
const statusEnum = ["Active", "InActive"]

var Schema=mongoose.Schema

const student_modal = new Schema({
   fname: {type: String},
   lname: {type: String},
   dob: {type: Date},
   gender: {type: String,enum: genderEnum},
   mobile_no: {type: Number},
   address: {type: String},
   email: {type: String},
   pincode: {type: Number},
   city: {type: String,enum: cityEnum},
   state: {type: String,enum: stateEnum},
   start_date: {type: String},
   end_date: {type: String},
   branch: {type: String,enum: branchEnum},
   course: { type: Schema.Types.ObjectId, ref: 'course_model' },
   batch: {type: String,enum: batchEnum},
   status: {type: String,enum: statusEnum}
});

module.exports = mongoose.model('student_model', student_modal);
