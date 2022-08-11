require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const sessions = require('express-session')
var methodOverride = require('method-override')

const app = express()
const port = proess.env.PORT || 3000
const connStr = `mongodb+srv://${process.env.MONGOID}:${process.env.SECRET_KEY}@cluster0.wbryl.mongodb.net/?retryWrites=true&w=majority`
const authController = require('./controllers/users/auth_controller')
const pageController = require('./controllers/page_controller')
const postController = require('./controllers/posts/post_controller')
//view engine
app.set('view engine','ejs')

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 600000 }
}))

//user Authetencation route
app.get('/', pageController.showHome)
app.get('/register', authController.showRegistrationForm)
app.post('/register', authController.register)
app.get('/login', authController.showLoginForm)
app.post('/login', authController.login)

// posts route
app.post('/post', postController.postTweetE )
app.get('/post', postController.getAllTweetE)
app.get('/post/:postId', postController.getOneTweetE)
app.patch('/post/:postId', postController.editTweetE)
app.delete('/post/:postId', postController.deleteTweetE)

app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'TweetE'})
        console.log('(^_^) DB connection success (^_^)')
    } catch(err){
        console.log('failed to connect to DB!', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})