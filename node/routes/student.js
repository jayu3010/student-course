const express = require('express');
const router = express.Router()
const studentController = require('../controllers/student')

//Student Routes
router.get("/getstudent", studentController.getStudentdetails)
router.post("/getstudentbyid", studentController.getStudentDetailsbyid)


router.post("/addstudent", studentController.addStudent)
router.put("/editstudent", studentController.editStudent)
router.put("/update-status", studentController.updateStudentStatus)


router.post("/genrate-report", studentController.getStudentReport)
router.delete("/delete-student", studentController.deleteStudent)


module.exports = router;
