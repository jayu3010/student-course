const express = require('express');
const router = express.Router()
const studentController = require('../controllers/student')

//Student Routes
router.get("/getstudent", studentController.getStudentdetails)
router.post("/getstudentbyid", studentController.getStudentDetailsbyid)


router.post("/addstudent", studentController.addStudent)
router.post("/genrate-report", studentController.getStudentReport)
router.delete("/delete-student", studentController.deleteStudent)


module.exports = router;
