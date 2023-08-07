const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    snname: {
        type: String,
        
    },
    sname: {
        type: String,
        
    },
    date: {
        type: Date,
       
    },

    email: {
        type: String,
       
    },
    pname: {
        type: String,
       
    },

    quantity: {
        type: Number,
       
    },

    unitprice: {
        type: Number,
       
    },

    status: {
        type: String,
       
    }
});



module.exports = mongoose.model('Order', OrderSchema);