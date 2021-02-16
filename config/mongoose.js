const mongoose = require('mongoose')

const monggoseurl = 'mongodb://localhost/Ecommerce'
const dba = 'mongodb+srv://naufalibnu:megajoget1@ass3-ecommerce.z0swz.mongodb.net/naufalibnu?retryWrites=true&w=majority'

module.exports = () => {
    mongoose.connect(dba, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    )
};
const db = mongoose.connection
db.on('error', (e) => console.log(e));
db.once('open', () => {
    console.log('we are connected to', dba)
});
