const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.get('/register', userController.registerView)


module.exports = router