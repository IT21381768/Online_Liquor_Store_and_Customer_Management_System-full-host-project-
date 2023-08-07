const mongoose = require('mongoose');

const productSchema2 = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    phone: {
        type: Number,
        
    },
    message: {
        type: String,
        
    },
    town: {
        type: String,
        
    },
    address: {
        type: String,
       
    },
    status: {
        type: String,
        
    }
});

module.exports = mongoose.model('Details', productSchema2);
//module.exports = mongoose.model('product', productSchema2);