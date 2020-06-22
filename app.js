const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDb = require('./config/db')

// Load config 
dotenv.config({
    path: './config/config.env'
})

// Passport config
require('./config/passport')(passport)

connectDb()

const app = express()

//Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    extname: '.hbs'}));
app.set('view engine', '.hbs');

// Express session
app.use(session({
    secret: 'pak polisi',
    resave: false,
    saveUninitialized: false,
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))

