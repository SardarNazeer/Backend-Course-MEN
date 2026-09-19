// ye root file me server start karty hai 

// hum apne src folder se app file import kar rahe hai jisme server create hua hai. 
const app = require("./src/app.js")

// server ko start karna 
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

// jab bhi server start hujaega port 3000 pe ye call back apne ap run hujaeyga 

// server run krne ke liye > node server.js 