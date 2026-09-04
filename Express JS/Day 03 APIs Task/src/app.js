// is file server create huta hai 

// express require karna 

const express = require('express')

// server ka instance create karke app me store karna 
const app = express()


// Task > ek task create karna jisme user notes create kar paye, 
// dekh paye, delete kar paye, update kar paye 

// hum apne notes array me store karenge 
// user title or description dega 
const notes = []

// server per data send huga 
app.post('/notes',(req,res) => {

})

// jo server create kia tha usko export kar rahe hai 
module.exports = app