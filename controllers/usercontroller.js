const User = require('../model/User')
const Address = require('../model/Address')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')


class UserController {
    static register(req, res, next) {
        const { errors, isValid } = validateRegister(req.body);
        if (!isValid) return res.status(400).json({ success: false, message: errors });
        else {
            const { username, password, email, first_name, last_name, Age } = req.body
            const user = new User({
                username, password, email, first_name, last_name, Age
            })
            user.save()
                .then(user => {
                    res.status(201).send({ success: true, message: "created user successfully", user })
                })
                .catch(next)
        }
    }
    static login(req, res, next) {
        const { errors, isValid } = validateLogin(req.body)
        if (!isValid) return res.status(400).json({ success: false, message: errors });
        else {
            const { email, password } = req.body
            User.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        const validator = (bcrypt.compareSync(password, user.password))
                        if (validator) {
                            const payload = { id: user.id }
                            const token = jwt.sign(payload, 'APASIH', { expiresIn: 3600 })
                            res.status(200).json({ sucsess: true, token, user_id: user.id })
                            next()
                        }
                        else {
                            next({ name: 'WRONG' })
                        }
                    }
                    else {
                        next({ name: 'NOT_FOUND' })
                    }
                })
        }
    }
    static updateuser(req, res, next) {
        const { userId } = req.params
        const { username, email, first_name, last_name } = req.body
        const userupdate = { username, email, first_name, last_name }

        for (let key in userupdate) {
            if (!userupdate[key]) {
                delete userupdate[key]
            }
        }
        User.findByIdAndUpdate(userId, userupdate, { new: true })
            .then((user) => {
                console.log(user)
                res.status(200).send({ success: true, message: 'updated', user })
            })
            .catch(next)
    }
    static getUser(req, res, next) {
        const { userId } = req.params
        User.findById(userId)
            .then((user) => {
                res.status(200).send({ username: user.username, email: user.email, firstname: user.first_name, lastname: user.last_name })
            }).catch(next)
    }
    static async address(req, res, next) {
        const { city, district, regency, province, country, Phone_number, zip_code, } = req.body
        const { userId } = req.params
        const user = await User.findById(userId)
        const address = await Address.create({ city, district, regency, province, country, Phone_number, zip_code, Id_user: userId })
            .then(address => {
                res.status(201).send(address)
            })
            .catch(next)
    }


}

module.exports = UserController