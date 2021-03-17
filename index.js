const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')

//configure handlebars
const hbs = exphbs.create({
         defaultLayout: 'main',
         extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (req, res)=>{
         res.render('index', {
                  title: 'Main page',
                  isHome: true
         })
})

app.get('/courses', (req, res)=>{
         res.render('courses', {
                  title: 'Courses',
                  isCourses: true
         })
})

app.get('/add', (req, res)=>{
         res.render('add', {
                  title: 'Add new course',
                  isAdd: true
         })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
         console.log(`Server has been started on port: ${PORT}`)
})