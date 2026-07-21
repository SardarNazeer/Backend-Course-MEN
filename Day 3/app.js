// Built In Controller and Form Controllers 

// form controls hum islye use krty hai ke frontend se data user jo bhi data frontend
// pe de raha hai hum use server pe lake use kr sake

const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// link css file to frontend 
// css static file huti hai > aisi file jise user bina kisi restriction 
// ke access kar skta hai frontend pe server se request krke. 

app.use(express.static("public"))
// ye ek built-in middleware hai.

app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.render("index");
});

// app.get('/get-form-data',(req,res) => {
//     console.log(req.query)
//     res.send('data recieved')
// })

// hum me name attribute ka use krenge use humein object ki form me data milega

// agar humein data apne server ke url pe nahi 
// show karwana huta toh hum post method ka use krty hai

app.post('/get-form-data',(req,res) => {
    console.log(req.query)
    res.send('data recieved')
})

// koi bhi form ho wo by default GET route ko he hit karta hai. 

// by default express na post ke ander jo body me hum data late hai wo read nai kar skta
// uske liye hum 2 middleware use krty hai

// app.use(express.json())
// ye JSON data ko read karta hai.
// Agar express.json() na lagao to:
// req.body> undefined aa sakta hai.

// app.use(express.urlencoded({extended:true}))
// HTML forms se aane wale data ko read karta hai.

// ye dono built-in middlewares 

// post method > frontend se backend data bhejne ke liye huta hai
// get method > frontend se server pe data ke loye huta hai

app.listen(3000)