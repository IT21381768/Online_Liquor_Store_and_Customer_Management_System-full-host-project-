const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    NIC: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    address: {
        type: String,
       
    },

    dateOfBirth: {
        type: Date,
       
    },
    gender: {
        type: String,
       
    },
    contactNo: {
        type: Number,
       
    },

    type: {
        type: String,
       
    },
    salary: {
        type: Number,
       
    },
    password: {
        type: String,
       
    }
});



module.exports = mongoose.model('EmployeeTable', EmployeeSchema);