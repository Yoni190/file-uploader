const express = require('express')
const path = require('node:path')
const authRoute = require('./routes/authRoute')
require('dotenv').config()





const app = express()
app.use('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(authRoute)

const PORT = process.env.PORT
app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server listening on port ${PORT}`)
})