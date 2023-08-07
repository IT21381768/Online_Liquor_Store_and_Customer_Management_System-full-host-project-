

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    message: {
        type: String,
       
    },
    note: {
        type: String,
    }
});



module.exports = mongoose.model('Post', postSchema);


