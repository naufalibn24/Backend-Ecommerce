const mongoose = require('mongoose');
const Product = require('./Product');
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;
let CartSchema = new Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        data: Buffer, contentType: String
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true,
    }
})

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart