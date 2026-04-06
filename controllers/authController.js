const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')
const { body, validationResult, matchedData } = require('express-validator')
const passport = require('passport')


const validateRegister = [
    body('f_name').trim()
        .notEmpty().withMessage('Please enter your first name'),
    body('l_name').trim()
        .notEmpty().withMessage('Please enter your last name'),
    body('username').trim()
        .notEmpty().withMessage('Please enter a username'), 
    body('password').trim()
        .notEmpty().withMessage('Please enter a password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
]

const validateLogin = [
    body('username').trim()
        .notEmpty().withMessage('Please enter your username.'),
    body('password').trim()
        .notEmpty().withMessage('Please enter your password.')
]

exports.register = [
    validateRegister,
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).render('sign-up', {
                errors: errors.array(),
            })
        }

        const { f_name, l_name, username, password } = matchedData(req)

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                f_name: f_name,
                l_name: l_name,
                username: username,
                password: password
            }
        })

        return res.redirect('/login')
    }
]

exports.login = [
    validateLogin,
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).render('login', {
                errors: errors.array()
            })
        }

        next()
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
]

exports.logout = [
    (req, res, next) => {
        req.logout((err) => {
            if(err) {
                return next(err)
            }

            res.redirect('/login')
        })
    }
]