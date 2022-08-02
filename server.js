require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const sessions = require('express-session')

const app = express()
const port = 3000
const connStr = `mongodb+srv://${process.env.MONGOID}:${process.env.SECRET_KEY}@cluster0.wbryl.mongodb.net/?retryWrites=true&w=majority`
const userController = require('./controllers/users/users_controller')
const pageController = require('./controllers/page_controller')
//view engine
app.set('view engine','ejs')

//middlewares
app.use(express.urlencoded({extended: true}))

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 600000 }
}))

//user route
app.get('/', pageController.showHome)
app.get('/users/register',userController.showRegistrationForm)
app.post('/users/register', userController.register)
app.get('/users/login', userController.showLoginForm)
app.post('/users/login', userController.login)


app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'TweetE'})
        console.log('(^_^) DB connection success (^_^)')
    } catch(err){
        console.log('failed to connect to DB', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})