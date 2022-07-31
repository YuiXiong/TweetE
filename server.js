require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = 3000
const connStr = `mongodb+srv://${process.env.MONGOID}:${process.env.SECRET_KEY}@cluster0.wbryl.mongodb.net/?retryWrites=true&w=majority`

const pageController = require('./controllers/page_controller')
//view engine
app.set('view engine','ejs')

app.get('/', pageController.showHome)

app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'TweetE'})
    } catch(err){
        console.log('failed to connect to DB', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})