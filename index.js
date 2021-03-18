const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
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

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
         console.log(`Server has been started on port: ${PORT}`)
})