const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.get('/register', userController.registerView)
router.get('/login', userController.loginView)
router.get('/', userController.home)


module.exports = router