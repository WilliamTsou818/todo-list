// setting express, handlebars and method-override
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// setting database and mongoose
const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true,   useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

// include routes
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout : 'main', extname : '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, ()=> {
  console.log('Server is running on http://localhost:3000')
})