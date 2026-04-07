exports.registerView = [
    (req, res) => {
        res.render('sign-up')
    }
]


exports.loginView = [
    (req, res) => {
        res.render('login')
    }
]

exports.home = [
    (req, res) => {
        res.render('home')
    }
]