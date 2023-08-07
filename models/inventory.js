const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    price: {
        type: Number,
       
    },

    quantity: {
        type: Number,
       
    },
    capacity: {
        type: Number,
       
    },

    material: {
        type: String,
       
    },
    percentage: {
        type: Number,
       
    },
    country: {
        type: String,
       
    },
    description: {
        type: String,

    },
    image: {
        type: String,
    }
});



module.exports = mongoose.model('Inventory', InventorySchema);