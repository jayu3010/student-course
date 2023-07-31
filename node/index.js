const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');

const app = express()
app.use(express.json());
const router = require('./routes/index');
app.use(cors());
const Port=3008

 async function connectToMongoDB() {
    try {
      await mongoose.connect('mongodb+srv://jayesh:rsf2VC64msx16Wga@cluster0.nzcmdzx.mongodb.net/STUDENT-COURSE?retryWrites=true&w=majority');
      console.log('Connected to MongoDB');

    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
    }
  }
  
  connectToMongoDB();
  app.use('/api',router)
  
  
  
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}...`)
})




// mongosh "mongodb+srv://cluster0.nzcmdzx.mongodb.net/" --apiVersion 1 --username jayesh
// jayesh
// rsf2VC64msx16Wga 
// studentform