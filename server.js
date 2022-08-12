require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const sessions = require('express-session')
var methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
const connStr = `mongodb+srv://${process.env.MONGOID}:${process.env.SECRET_KEY}@cluster0.wbryl.mongodb.net/?retryWrites=true&w=majority`
const authMiddleware = require("./middlewares/auth_middleware");
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
app.use(authMiddleware.setUserVaribleMiddleware);

//user Authetencation route
app.get('/', pageController.showHome)
//app.get('/register', authController.showRegistrationForm) //shifted to homepage
app.post('/register', authController.register)
app.get('/login', authController.showLoginForm)
app.post('/login', authController.login)
app.post('/logout', authController.logout)

// posts route
app.post('/post', authMiddleware.authenticatedOnly, postController.postTweetE )
app.get('/post', authMiddleware.authenticatedOnly, postController.getAllTweetE)
app.get('/post/:postId', authMiddleware.authenticatedOnly, postController.getOneTweetE)
app.patch('/post/:postId', authMiddleware.authenticatedOnly, postController.editTweetE)
app.delete('/post/:postId', authMiddleware.authenticatedOnly, postController.deleteTweetE)

app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'TweetE'})
        console.log('(^_^) DB connection success (^_^)')
    } catch(err){
        console.log('failed to connect to DB!', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})
