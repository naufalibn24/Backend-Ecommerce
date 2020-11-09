const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    category_name: { type: String },
    picture: { data: Buffer, contentType: String }
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category