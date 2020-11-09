const Product = require('../model/Product')
const Category = require('../model/Category')
const formidable = require('formidable')
const fs = require('fs')


class ProductController {
    static async createProduct(req, res, next) {
        const { categoryId } = req.params
        // const category = await Category.findById(categoryId)
        // const { Id_category } = categoryId
        let form = formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, body, files) => {
            if (err) {
                return res.status(500).send({ success: false, msg: 'cant upload' })
            }
            const {
                product_name,
                description,
                price,
                short_description,
                stock,
                Id_category
            } = body

            const product = new Product(body)
            if (files.picture && files.thumbnail) {
                if (files.picture.size > 400 * 200 && files.thumbnail.size > 200 * 200) {
                    return res.status(400).send({ msg: 'file too large' })
                }
            }
            product.picture.data = fs.readFileSync(files.picture.path)
            product.picture.contentType = files.picture.type
            product.thumbnail.data = fs.readFileSync(files.thumbnail.path)
            product.thumbnail.contentType = files.thumbnail.type

            product.save(product)
                .then(product => {
                    res.status(400).send({ product })
                })
                .catch(err => ({ name: 'PRODUCK' }))
        })
    }
    static getproductbycategory(req, res, next) {
        Product.find({ Id_category: req.params.Id_category })
            .then((product) => {
                res.status(200).send({ success: true, product })
            })
            .catch(next)
    }
    static putproduct(req, res, next) {
        const { productId } = req.params
        const { product_name, description, price, short_description } = req.body
        const productupdate = {
            product_name, description, price, short_description, stock
        }

        for (let key in productupdate) {
            if (!productupdate[key]) {
                delete productupdate[key]
            }
        }
        Product.findByIdAndUpdate(productId, productupdate, { new: true })
            .then((updated) => {
                console.log(updated)
                res.status(200).json({ success: true, message: 'updated sucsess', data: { product_name: updated.product_name, description: updated.description, price: updated.price, short_description: updated.short_description, stock: updated.stock } })
            })
            .catch(next)
    }
    static deleteproduct(req, res, next) {
        const { productId } = req.params
        Product.findByIdAndDelete
            .then((deleteproduct) => {
                res.status(200).send({ success: true, message: 'product has been deleted', deleteproduct })
                next()
            })
            .catch((err) => next({ name: 'DELETED' }))
    }

    static async productAll(req, res, next) {
        const { page = 1, limit = 6, q = '' } = req.query


        try {
            const product = await Product.find({ product_name: { '$regex': q, '$options': 'i' } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()
            const nextpage = parseInt(page) + parseInt('1')
            const previouspage = parseInt(page) - parseInt('1')
            const jumlahData = await Product.countDocuments({ product_name: { '$regex': q, '$options': 'i' } })
            const jumlahPage = Math.ceil(jumlahData / limit)
            var npg, ppg
            if (parseInt(page) === parseInt(jumlahPage) && parseInt(page) === 1) {
                npg = null
                ppg = null

            } else if (parseInt(page) === parseInt(jumlahPage)) {
                ppg = 'http://localhost:3000/products?page=' + previouspage
                npg = null
            }
            else if (parseInt(page) === 1) {
                npg = 'http://localhost:3000/products?page=' + nextpage
                ppg = null
            } else {
                npg = 'http://localhost:3000/products?page=' + nextpage
                ppg = 'http://localhost:3000/products?page=' + previouspage
            }
            res.status(200).send({
                product,
                page: page,
                totalPage: jumlahPage,
                nexpages: npg,
                previousPage: ppg

            })
        } catch (error) {
            console.error(error.message)
        }

    }
    static showPicture(req, res, next) {
        const { productId } = req.params
        Product.findById(productId)
            .then(product => {
                if (product.picture.data) {
                    res.set('Content-Type', product.picture.contentType)
                    return res.send(product.picture.data)
                }
            })

    }
}

module.exports = ProductController