const { prisma } = require('../lib/prisma')

exports.upload = [
    async (req, res) => {
        const folderId = parseInt(req.params.id)
        const fileName = req.file.originalname
        const size = req.file.size

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