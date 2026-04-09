const { prisma } = require('../lib/prisma')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.upload = [
    async (req, res) => {
        const file = req.file
        const folderId = parseInt(req.params.id)
        const fileName = file.originalname
        const size = parseFloat((file.size / 1000000).toFixed(2))

        const {data, error } = await supabase.storage
                      .from('files')
                      .upload(`public/${fileName}`, file, {
                        cacheControl: '3600',
                        upsert: false
                      })

        if(error) {
            console.log(error)
        } else {
            console.log(data)
        }

        

        await prisma.file.create({
            data: {
                name: fileName,
                size: size,
                url: data.fullPath,
                folder: {
                    connect: { id: folderId }
                }
            }
        })
        res.redirect(`/folder/${folderId}`)
    }
]

exports.deleteFile = [
    async (req, res) => {
        const fileId = parseInt(req.params.id)
        const file = await prisma.file.delete({
            where: { id: fileId }
        })

        res.redirect(`/folder/${file.folderId}`)
    }
]