const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(express.json());
const router = require('./routes/index');
app.use(cors());
const Port=3008
 
 async function connectToMongoDB() {
    try {
      console.log("process.env.MONGOURL",process.env.MONGOURL)
      const res=await mongoose.connect(process.env.MONGOURL);
      console.log('Connected to MongoDB');

    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
    }
  }
  
  connectToMongoDB();
  app.use('/api',router)
  app.get('/',function(req,res){
res.send("Success")
  })
  
  
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}...`)
})