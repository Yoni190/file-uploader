const { prisma } = require('../lib/prisma')

exports.createView = [
    (req, res) => {
        res.render('add_folder', {
            title: 'Create Folder'
        })
    }
]

exports.create = [
    async (req, res) => {
        const { folder_name } = req.body
        await prisma.folder.create({
            data: {
                name: folder_name,
                user: {
                    connect: { id: req.user.id }
                }
            }
        })

        return res.redirect('/')
    }
]