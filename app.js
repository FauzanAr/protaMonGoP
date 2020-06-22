const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDb = require('./config/db')

// Load config 
dotenv.config({
    path: './config/config.env'
})

connectDb()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))

