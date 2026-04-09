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

        const { data, error } = await supabase.storage
                      .from('files')
                      .upload(`public/${fileName}`, file.buffer, {
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
                url: data.path,
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

        const { data, error } = await supabase.storage
                                              .from('files')
                                              .remove([file.url])

        if(error) {
            console.log(error)
        }

        res.redirect(`/folder/${file.folderId}`)
    }
]

exports.download = [
    async (req, res) => {
        const fileId = parseInt(req.params.id)

        const file = await prisma.file.findUnique({
            where: { id: fileId }
        })

        const { data, error } = await supabase.storage
                                 .from('files')
                                 .download(file.url)

        if(error) {
            console.log('Error: ', error)
        } else {
            console.log('Success: ', data)
        }
        
        const buffer = Buffer.from(await data.arrayBuffer())

        res.setHeader('Content-Disposition', `attachment; filename="${file.name}`)
        res.setHeader('Content-Type', 'application/pdf')

        res.send(buffer)
    }
]