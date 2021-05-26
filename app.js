// setting express, handlebars and method-override
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// include mongoose
require('./config/mongoose')

// include routes
const routes = require('./routes')

// set visual template
app.engine('hbs', exphbs({ defaultLayout : 'main', extname : '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, ()=> {
  console.log('Server is running on http://localhost:3000')
})