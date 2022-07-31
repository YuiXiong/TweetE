require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const userController = require('./controllers/users/users_controller')


const app = express()
const port = 3000
const connStr = `mongodb+srv://${process.env.MONGOID}:${process.env.SECRET_KEY}@cluster0.wbryl.mongodb.net/?retryWrites=true&w=majority`

const pageController = require('./controllers/page_controller')
//view engine
app.set('view engine','ejs')

//user route
app.get('/', pageController.showHome)
app.get('/users/register',userController.showRegistrationForm)
app.get('/users/login', userController.showLoginForm)

app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'TweetE'})
        console.log('(^_^) DB connection success (^_^)')
    } catch(err){
        console.log('failed to connect to DB', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})