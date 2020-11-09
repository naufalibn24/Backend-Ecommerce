const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdressSchema = new Schema({
    city: { type: String },
    district: { type: String },
    regency: { type: String },
    province: { type: String },
    country: { type: String },
    Phone_number: { type: Number },
    zip_code: { type: String },
    Id_user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Adress = mongoose.model('Adress', AdressSchema)
module.exports = Adress