const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const mongoose = require('mongoose')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')
const cardRoute = require('./routes/card')

//configure handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))

//Routs registaration
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',courseRoutes)
app.use('/card', cardRoute)

const PORT = process.env.PORT || 3000
async function start() {
  try {

    const url = 'mongodb+srv://yurii:2cAbstiUiKTi91LY@cluster0.ahyc9.mongodb.net/shop?retryWrites=true&w=majority'
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

//2cAbstiUiKTi91LY