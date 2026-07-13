// What is node js ?

// Node.js ek JavaScript Runtime Environment hai jo browser ke bahar JavaScript 
// code chalane ke liye use hota hai. Iski madad se aap backend applications, 
// APIs, web servers, real-time apps, aur command-line tools bana sakte hain.

console.log("Hello Node.js");


// Why node js?

// Node.js se pehle JavaScript sirf browser me chalti thi. 
// Agar backend banana hota tha to PHP, Java, ya Python use karna padta tha.

// Node.js ke baad:

// Frontend me JavaScript
// Backend me bhi JavaScript

// Yani ek hi language se full-stack development mumkin ho gaya.


// What is package ?

// ye ek reusable code huta hai jo pehla se kisi ne likha huta hai or hum uska use kr skte hai

// require> jo package apne install kiya hai usko apki js file 
// me use krne ke liye require use huta

// ap isko ek variable me store krte ho or uske bd call krte ho 

const catMe = require('cat-me');

console.log(catMe());

// package.json file > humein dependencies batati hai ke apke app me kya kya install hai.

// how to create server 

const http = require('http');

// createserver ek server create krega uske ander hum do callbacks denge 
// res.end > koi bhi user agar hamare server pe kuch b 
// request bhejega uske response pe humne kya show karwana hai. 

const server = http.createServer((req,res) => {
    console.log(req.url)
    res.end('Hello World')
})

// server ko run karwane ke liye humein port number chaiye huta hai 

server.listen(3000)

// Routing > url humein batata hai ke ap kis particular route ko hit kr rhe ho

// npx nodemon > ye kya karta hai realtime me apki application ko start karta hai 
