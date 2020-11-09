const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product_name: { type: String },
    thumbnail: { data: Buffer, contentType: String },
    picture: { data: Buffer, contentType: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    short_description: { type: String },
    Id_category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product