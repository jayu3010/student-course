const express = require('express');
const router = express.Router()
const courseController = require('../controllers/course')

//Course Routes
router.get("/getcourse", courseController.getcoursedetails)
router.post("/getcoursebyid", courseController.getcoursedetailsbyid)

router.post("/addcourse", courseController.addcourse)


module.exports = router;
