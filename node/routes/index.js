const express = require('express');
const router = express.Router()
const studentRoutes = require('./student');
const courseRoutes = require('./course');
const feesRoutes = require('./fees');


// Routes
router.use('/student', studentRoutes)
router.use('/course', courseRoutes)
router.use('/fees', feesRoutes)





module.exports = router;
