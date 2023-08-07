const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    countInStock: {
        type: Number,
       
    },
    quantity: {
        type: Number,
        
    }
});

module.exports = mongoose.model('Cart', cartSchema);
//module.exports = mongoose.model('product', productSchema2);