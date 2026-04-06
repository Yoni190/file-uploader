const express = require('express')
const path = require('node:path')
const authRoute = require('./routes/authRoute')
const session = require('express-session')
const passport = require('passport')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')

const { prisma } = require('./lib/prisma.js')
require('dotenv').config()



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new PrismaSessionStore(
    prisma,
    {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
    }
)
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        store: sessionStore
    })
)
app.use(passport.session())
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(authRoute)

const PORT = process.env.PORT
app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server listening on port ${PORT}`)
})