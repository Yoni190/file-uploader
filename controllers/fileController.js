const { prisma } = require('../lib/prisma')

exports.upload = [
    async (req, res) => {
        const folderId = parseInt(req.params.id)
        const fileName = req.file.originalname
        const size = parseFloat((req.file.size / 1000000).toFixed(2))

        await prisma.file.create({
            data: {
                name: fileName,
                size: size,
                folder: {
                    connect: { id: folderId }
                }
            }
        })
        res.redirect(`/folder/${folderId}`)
    }
]