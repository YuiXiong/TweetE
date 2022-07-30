require('dotenv').config()

const express = require('express')

const app = express()
const port = 3000

const pageController = require('./controllers/page_controller')
//view engine
app.set('view engine','ejs')

app.get('/', pageController.showHome)

app.listen(port, async() => {
    try{
        await mongoose.connect(connStr,{dbName:'biscoff'})
    } catch(err){
        console.log('failed to connect to DB', `${err}`)
    }
  console.log(`App running fine on port ${port}`)
})