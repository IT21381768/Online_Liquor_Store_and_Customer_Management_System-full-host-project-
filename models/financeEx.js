const mongoose = require('mongoose');

const FinanceExSchema = new mongoose.Schema({
    date: {
        type: Date,
        
    },
    category: {
        type: String,
        
    },
    invoiceNum: {
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



module.exports = mongoose.model('FinanceEx', FinanceExSchema);