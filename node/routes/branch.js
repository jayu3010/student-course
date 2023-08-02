const express = require('express');
const router = express.Router()
const branchController = require('../controllers/branch')
 
//branch Routes
router.get("/getbranch", branchController.getbranchdetails)
router.post("/getbranchbyid", branchController.getbranchdetailsbyid)
router.post("/addbranch", branchController.addbranch)
module.exports = router;
