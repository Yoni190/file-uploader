const { Router } = require('express')
const router = Router()
const fileController = require('../controllers/fileController')
const { isAuth } = require('../middleware/isAuth')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


router.post('/upload/:id', upload.single('file'), fileController.upload)
router.post('/delete-file/:id', fileController.deleteFile)
router.get('/download/:id', fileController.download)

module.exports = router