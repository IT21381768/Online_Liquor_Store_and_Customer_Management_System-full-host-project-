const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    oname: {
        type: String,
        
    },
    odes: {
        type: String,
        
    },
    oval: {
        type: String,
       
    },

    sdate: {
        type: String,
       
    },
    edate: {
        type: String,
       
    },

    min: {
        type: String,
       
    }
});



module.exports = mongoose.model('offer', OfferSchema);