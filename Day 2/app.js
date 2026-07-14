// create server 

// const http = require('http');

// const server = http.createServer((req,res) => {
//     if (req.url === "/about") {
//         res.end("The about page")
//     }
//     if (req.url === "/contact") {
//         res.end("The contact page")
//     }
//     if (req.url === '/') {
//         res.end("Home Page")
//     }
// })

// server.listen(3000)


// Express js 

// install express js > npm i express

// express > ek tool box hai jisse hum server banate hai 

// require() ka matlab hota hai kisi package ko import karna.
// Humne Express ko pehle install kiya tha: > npm install express
// Ab us package ko apni file me use karne ke liye likhte hain:
// const express = require("express");
// require("express") → Express package ko load karta hai.
// const express → us package ko express variable me store karta hai.
// const app = express();
// express() Yeh Express ka function hai.
// Jab tum express() call karte ho to ek application object ban jata hai.
// Ab app ke through hum server banayenge aur routes likhenge.
// app.get > route bana ke deta hai 

const express = require('express');
const app = express();

app.set("view engine","ejs");

app.use((req,res,next)=>{
     console.log("this is middleware")
    //  middalware me hum res send nahi karty 

    const a = 2;
    const b = 3;

    console.log(a+b);

    return next();
})

app.get('/',(req,res)=>{
    // res.send("Hello World")
    res.render('index')
})

app.get('/about', (req,res)=>{
    res.send("About Page")
})

app.get('/login', (req,res)=>{
    res.send("login page")
})

const PORT = 3000;

app.listen(PORT,(req,res) =>{
    console.log(`server running on port ${PORT}`);
})

// app.listen(3000);


// How to render html with the help of express 

// uske liye hum engine use krty hai. 
// install engine > npm i ejs 

// Middalwares 

// Middleware ek function hota hai jo request aur response ke beech me execute hota hai.

// hamare route pe koi bhi req aty hai hamare routes pe jane se pehla ek func pe jaye 
// ise middelware kehty hai. 

// app.use((req,res,next)=>{
//     console.log("this is middleware")
// })

// next() kya karta hai?

// Middleware ke andar next() bahut important hai.
// "Agla middleware ya route execute karo."
// To request wahi ruk jayegi.

// Browser me loading hoti rahegi kyun ke route tak request pahunchi hi nahi.

// 3 types of middleware 

// built in middleware > jo express me khud hi rehte hai
// custom middleware > jo hum khud banate hai
// third party middleware > kisi or ke banaye middleware use krty hai. 

// express.json() Middleware
// Ye Express ka built-in middleware hai.

// Iska kaam hai JSON data ko read karna.
// Agar Postman se bhejo:

// json{
//     "name": "Ali",
//     "age": 22
// }

app.post('/student',(req,res)=>{
    console.log(req.body)

    res.send("Done")
})

// output: 
// {
//     name: "Ali",
//     age: 22
// }

// agar express.json() nahi likhoge toh 
// req.body > ki value undefined hugi

// Middleware ka use kahan hota hai?

// 1. Logging

app.use((res,req,next)=>{
    console.log(req.method);
    next();
})

// 2. Authentication
// Check karo user login hai ya nahi.

app.use((req,res,next)=>{
    const loggedIn = true;

    if (loggedIn) {
        next();
    } else{
        res.send('login first')
    }
});

// Route Middleware
// Middleware sirf ek specific route ke liye bhi laga sakte ho

const checkUser = (req,res,next)=>{
    console.log("checking user");

    next();
};

app.get("/profile",(req,res)=>{
    res.send("Profile Page")
});

// Common uses: logging, authentication, validation, 
// error handling, aur JSON parsing (express.json()).


// third party middleware 

// npm i morgan 

// morgan express js ka ek popular logging middalware hai 

// how to use it 

const morgan = require('morgan');

app.use(morgan('dev'));