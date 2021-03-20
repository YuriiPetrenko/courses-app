const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const mongoose = require('mongoose')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')
const cardRoute = require('./routes/card')
const User = require('./models/user')
const { nextTick } = require('process')

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

app.use(async (req, res, next)=>{
  try {
    const user = await User.findById('6056413daa66852ba49afc17')
    req.user = user
    next()
  }catch(e){
    console.log(e)
  }
})

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

    const candidate = await User.findOne()
    if (!candidate){
      const user = new User({
        email: 'example@gmail.com',
        name: 'yurii',
        cart: {items:[]}
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

//2cAbstiUiKTi91LY