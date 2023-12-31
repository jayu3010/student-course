const express = require('express');
const router = express.Router()
const feesController = require('../controllers/fees')

router.get("/getfees", feesController.getfeesdetails)
router.post("/addfees", feesController.addfees)
router.post("/getfeesbystudent", feesController.getfeesbyStudentId)


router.put("/update-fees", feesController.updateFees)

module.exports = router;
