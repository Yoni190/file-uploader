const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
import { prisma } from '../lib/prisma'

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: username }
            })

            if(!user) {
                return done(null, false, { message: 'Incorrect Username'} )
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return done(null, false, { message: 'Incorrect Password'})
            }

            return done(null, user)
            
        } catch (error) {
            return done(error)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        })

        done(null, user)
    } catch (error) {
        done(error)
    }
})

module.exports = passport