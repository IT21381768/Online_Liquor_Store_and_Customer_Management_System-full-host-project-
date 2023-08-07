const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    NIC: {
        type: String,
        
    },
    leaveDate: {
        type: Date,
       
    },
    reason: {
        type: String,
        
    }
});

module.exports = mongoose.model('Leaves', leaveSchema);