// is file server create huta hai 

// express require karna 

const express = require('express')

// server ka instance create karke app me store karna 
const app = express()

// middleware express.json 

app.use(express.json())

// express ka jo server huta hai uske ander itni capacity nahi huti ke jo body ke ander ane
// wala data huta hai usko wo read kar sake, islye hum middlewre use krty hai. 

// Task > ek task create karna jisme user notes create kar paye, 
// dekh paye, delete kar paye, update kar paye 

// hum apne notes array me store karenge 
// user title or description dega 
const notes = []

// server per data send huga 
app.post('/notes',(req,res) => {
    console.log(req.body)

    notes.push(req.body)

    // 201 status code tab use krty hai jab backend me ek naya resource create krty hai 
    res.status(201).json({
        message: "Note created successfully"
    }) 
})

// jab bhi apko data req.body me chaiye huta hai ap middleware use krty hai. 

// backend se jitne note create huwe hai usko frontend pe show krwane k lie api

// get method> data server se frontend pe ja raha hai. 

app.get('/notes', (req,res)=>{

    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })

})

// delete api for deleting notes
// delete/notes/:index:

// : lagane ke bad express ko pata huta hai jo iske bad aega wo dynamic huga. 

app.delete('/notes/:index',(req,res)=>{

    // ye var humein index num bataega 
    const index = req.params.index

    delete notes[index]

    res.status(200).json({
        message: "note deleted successfully"
    })

})

// ap jab bhi apne code me change krty hai nodemon server ko khud restart kar deta hai 

// to install nodemon 
// npx nodemon server.js

// jo server create kia tha usko export kar rahe hai 
module.exports = app