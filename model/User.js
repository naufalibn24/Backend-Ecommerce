const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { schema } = require('./Order');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    Age: { type: String },
    role: { type: String, default: 'user' },
    Address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }
});

UserSchema.pre('save', function (next) {
    User.findOne({ email: this.email })
        .then((user) => {
            if (user) next({ name: 'ALREADY_USED' });
            else {
                const salt = bcrypt.genSaltSync(10);
                this.password = bcrypt.hashSync(this.password, salt)
                console.log(this.password)
                next();
            }
        })
        .catch((e) => next({ name: 'DATA ERROR' }))
})

const User = mongoose.model('User', UserSchema)
module.exports = User