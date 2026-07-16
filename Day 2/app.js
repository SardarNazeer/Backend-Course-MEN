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

// knsi request ayi thi hamare server pe, uska method kya tha, route kya tha, 
// kitna time liya response bhejne me.

// apka koi bhi middalware ho, custom, built-in, 
// third party by default sub route ke lie chalte hai


// why middleware ?

// Agar middleware na ho to har route me same code baar baar likhna padega.

// problem without middleware. 
// Maan lo har route par user login check karna hai:

app.get("/profile", (req,res) => {
    if(!inLogged){
        return res.send("login first");
    }
    res.send("Profile Page")
})

app.get("/dashboard",(req,res) => {
    if (!inLogged) {
        return res.send("login first")
    }
    res.send("Dashboard Page")
})

// Yahan authentication code har route me repeat ho raha hai.


// Solution Using Middleware

const auth = (req,res,next) => {
    if (!inLogged) {
        return res.send("Login First")
    }

    next()
};

app.get("/profile", auth, (req,res) => {
    res.send("Profile Page")
});

app.get("/dashboard", auth, (req,res) => {
    res.send("Dahboard Page")
});

// Ab authentication ka code sirf ek jagah likha gaya.

// Middleware ke Main Uses

// 1. Authentication 
// Check karta hai user login hai ya nahi.

app.get("/profile", auth, handler);

// 2. Authorization
// Check karta hai user Admin hai ya Normal User.

const isAdmin = (req,res,next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.send("Access Denied")
    }
};

// 3. Logging
// Har request ka record rakhna

app.use((req,res,next) => {
    console.log(req.method,req.url);
    next();
});

// output: 
// GET /users
// POST /login

// 4. Data Validation
// Request ka data check karna

const validateUser = (req,res,next) => {
    if (!req.body.email) {
        return res.send("Email Required")
    }

    next();
}

// 5. Error Handling
// Errors ko handle karna.

app.use((err,req,next)=> {
    res.status(500).send("Something went wrong");
});

// 6. Parsing Data
// JSON data ko JavaScript object me convert karna.

app.use(express.json());

// Middleware ki zarurat code reuse, authentication, authorization, logging, 
// validation aur request/response ko process karne ke liye hoti hai. 
// Ye request aur route handler 
// ke darmiyan execute hota hai aur application ko modular aur maintainable banata hai.

// kisi specific routes ke liye middleware banana. 

app.get("/",
    (req,res,next) => {
        const a = 5;
        const b = 7;

        console.log(a+b);
        next();
    }
    , (req,res) => {
        res.render('next')
    })

    