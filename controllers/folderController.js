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

exports.folderDetails = [
    async (req, res) => {
        const folderId = parseInt(req.params.id)
        
        const folder = await prisma.folder.findUnique({
            where: { id: folderId, userId: req.user.id },
        })

        res.render('folder-details', {
            title: 'Folder Details',
            folder: folder
        })
    }
]