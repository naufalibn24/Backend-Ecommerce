const Category = require('../model/Category')
const formidable = require('formidable')
const fs = require('fs')

class Catcontroller {
    static postcategory(req, res, next) {
        let form = formidable.IncomingForm()
        form.keepExtension = true
        form.parse(req, (err, body, files) => {
            if (err) {
                return res.status(500).send({ success: false, msg: 'cant upload' })
            }
            const { category_name, picture } = body
            const category = new Category(body)
            if (files.picture) {
                if (files.picture.size > 500 * 250) { return res.status(400).send({ msg: 'file too large' }) }
            }
            category.picture.data = fs.readFileSync(files.picture.path)
            category.picture.contentType = files.picture.type

            category.save(category)
                .then(category => {
                    res.status(200).send({ category })
                })
                .catch(next)
        })
    }

    static async findcategory(req, res, next) {
        Category.find()
            .then(category => res.send({ success: true, category }))
            .catch(err => next({ name: 'NOT_FOUND' }))
    }
    static showpicture(req, res, next) {
        const { categoryId } = req.params
        Category.findById(categoryId)
            .then(category => {
                if (category.picture.data) {
                    res.set('Content-Type', category.picture.contentType)
                    return res.send(category.picture.data)
                }
            })
    }
}


module.exports = Catcontroller