// Server kya hai ?

// server ek machine huti hai, jise program kiya jata hai user jo bhi response
// kare uska proper response de sakein. 
// node js application hai, 

// npm init -y > hamare node js application ko initialize karta hai 

// server ko hum express packages ke help se create krty hai 
// to install express > npm i express 

// express package ko require kia 
const express = require('express');

// created a server 
const app = express()  // server instance create huwa.

// express ko call karne ke bad uska ek instance ban raha hai,
// jo app variable me save hu raha hai. 

// program s server > when user request what response will be send 

// / api pe jab bhi koi request ayegi to uska response ye jayega 
app.get("/",(req,res) => {
    res.send("Hello World")
})

app.get("/about",(req,res) => {
    res.send("About Page")
})

// req > jo bhi data frontend se backend pe arha hu usko acces krne ke liye req. 

// res > jo bhi req arhi hai uska response bhejne ke liye res use krty hai. 

// iske bad server ko dobara run karenge
// node server.js 

// started a server 
app.listen(3000)

// 3000 > port number 

// to run a code > node server.js 

// server ka host local machine hai 

