const { prisma } = require('../lib/prisma')

exports.registerView = [
    (req, res) => {
        res.render('sign-up', {
            title: 'Sign Up'
        })
    }
]


exports.loginView = [
    (req, res) => {
        res.render('login', {
            title: 'Login'
        })
    }
]

exports.home = [
    async (req, res) => {
        const folders = await prisma.folder.findMany({
            where: { userId: req.user?.id },
            orderBy: { createdAt: 'desc' }
        })

        res.render('home', {
            title: 'Home',
            folders: folders
        })
    }
]