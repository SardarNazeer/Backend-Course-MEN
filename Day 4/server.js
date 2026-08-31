const express = require('express')
const morgan = require('morgan')
const app = express()
const userModel = require('./models/user')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/about', (req,res) => {
    res.send("About page")
})

app.get('/profile', (req,res) => {
    res.send("Profile Page")
})

app.get('/register', (req,res) => {
    console.log(req.body)
    res.send("data recieved")
})

app.listen(3000)