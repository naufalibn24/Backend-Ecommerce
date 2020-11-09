// const Product = require('../model/Product')

// const productDao = {
//     getProduct: (query) => {
//         return new Promise(
//             (resolve, reject) => {
//                 Product.findOne(query).populate('category').exec(function (err, product) {
//                     if (err || !product) {
//                         return reject({
//                             status: 400,
//                             success: false,
//                             err
//                         })
//                     } else {
//                         return resolve({ product })
//                     }
//                 })
//             }
//         )
//     }
// }

// module.exports = productDao