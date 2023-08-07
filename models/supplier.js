const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    snname: {
        type: String,
        
    },
    sname: {
        type: String,
        
    },
    address: {
        type: String,
       
    },

    email: {
        type: String,
       
    },
    website: {
        type: String,
       
    },

    phone: {
        type: Number,
       
    },
    status: {
        type: String,
       
    }
});



module.exports = mongoose.model('Supplier', SupplierSchema);