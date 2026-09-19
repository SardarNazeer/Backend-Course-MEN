// import express in our project 
const express = require('express')

// server create 
const app = express()

// express middleware > iske bghr data jo req.body me arha hai use nai dekh sakte 
app.use(express.json())


// routes.... 



// app ko yani server ko dosri file me use krne k lie export 
module.exports = app