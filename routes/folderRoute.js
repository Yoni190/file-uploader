const { Router } = require('express')
const router = Router()
const folderController = require('../controllers/folderController')
const { isAuth } = require('../middleware/isAuth')

router.get('/create-folder', isAuth, folderController.createView)
router.post('/create-folder', isAuth, folderController.create)

module.exports = router