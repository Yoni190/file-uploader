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
    (req, res) => {
        res.render('home', {
            title: 'Home'
        })
    }
]