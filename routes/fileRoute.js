const { Router } = require('express')
const router = Router()
const fileController = require('../controllers/fileController')
const { isAuth } = require('../middleware/isAuth')

router.post('/upload', fileController.upload)

module.exports = router