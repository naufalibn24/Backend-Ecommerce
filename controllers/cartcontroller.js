const Cart = require('../model/Order')
const Product = require('../model/Product')
const User = require('../model/User')

class CartController {
    static addItemToCart(req, res, next) {
        const { productId, quantity } = req.body
        const { userId } = req.params
        let qty
        if (quantity) {
            qty = quantity
        } else {
            qty = 1
        }
        Product.findById(productId).then(product => {
            Cart.findOne({ userId, productId }).then(cart => {
                if (cart === null) {
                    console.log("kosong");
                    const carts = new Cart({
                        userId: userId,
                        productId: productId,
                        quantity: quantity,
                        thumbnail: product.thumbnail,
                        price: product.price,
                        totalprice: quantity * product.price
                    })
                    console.log("cart", carts)

                    console.log(1111111111)
                    return carts.save()

                } else {

                    const newtotalqty = parseInt(cart.quantity) + parseInt(qty)
                    const newtotalprice = cart.price * newtotalqty
                    console.log('update')
                    console.log(newtotalprice)
                    console.log(newtotalqty)
                    return Cart.findByIdAndUpdate({ _id: cart._id }, { $set: { totalprice: newtotalprice, quantity: newtotalqty } })

                }

            }).then(cart => {
                res.status(200).send({
                    success: true,
                    message: 'Berhasil tambah Cart'
                })
            }).catch(err => res.status(500).send(err))
        })

    }
    static async Orderdetails(req, res, next) {
        Cart.findById(req.params.id).then(cart => {
            Product.findById(cart.productId).then(product => {
                if (product.stock < cart.quantity) {
                    return next({ name: "OUT_OF_STOCK" })
                } else {
                    const totalStock = product.stock - cart.quantity

                    return Product.findByIdAndUpdate({ _id: cart.productId }, { $set: { stock: totalStock } })
                }
            }).then(product => {
                res.status(200).send({ quantity: cart.quantity, totalprice: cart.totalprice })
                return Cart.deleteOne({ _id: cart.id })
            })
        })

    }
}

module.exports = CartController