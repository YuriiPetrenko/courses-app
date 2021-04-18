const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const mongoose = require('mongoose')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')
const cardRoute = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const MONGODB_URI = 'mongodb+srv://yurii:2cAbstiUiKTi91LY@cluster0.ahyc9.mongodb.net/shop?retryWrites=true&w=majority'
//configure handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(varMiddleware)
app.use(userMiddleware)

//Routs registaration
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',courseRoutes)
app.use('/card', cardRoute)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


const PORT = process.env.PORT || 3000
async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    // const candidate = await User.findOne()
    // if (!candidate){
    //   const user = new User({
    //     email: 'example@gmail.com',
    //     name: 'yurii',
    //     cart: {items:[]}
    //   })
    //   await user.save()
    // }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

//2cAbstiUiKTi91LY