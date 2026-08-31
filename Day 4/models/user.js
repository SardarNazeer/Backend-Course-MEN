// schema > means kisi collection me kya kya properties hu skti hai.

// schema of user 

const mongoose = require('mongoose')


// humein user ke data ke sath uska type b batana parega 
// kisi aisi property jisme sirf limited value ati ho usko hum enum me likhte hai. 


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number, 
    gender:{
        type:String,
        enum:['male', 'female']
}
})


const userModel = mongoose.model('user', userSchema)

module.exports = userModel