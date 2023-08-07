const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        username : "admin",
        
    },
    password: {
        type: String,
        password : "admin",
        
    },
   
});



module.exports = mongoose.model('Login', LoginSchema);