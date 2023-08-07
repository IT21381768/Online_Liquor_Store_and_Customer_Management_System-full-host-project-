const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        
    },
    category: {
        type: String,
        
    },
    type: {
        type: String,
       
    },

    remarks: {
        type: String,
       
    },
    amount: {
        type: Number,
       
    },

    status: {
        type: String,
       
    },
    /*action: {
        type: String,
       
    }*/
});



module.exports = mongoose.model('Finance', FinanceSchema);