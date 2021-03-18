const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')

//configure handlebars
const hbs = exphbs.create({
         defaultLayout: 'main',
         extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',courseRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
         console.log(`Server has been started on port: ${PORT}`)
})