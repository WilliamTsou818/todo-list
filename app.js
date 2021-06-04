// setting express, handlebars and method-override
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000

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

app.listen(PORT, ()=> {
  console.log(`Server is running on http://localhost:${PORT}`)
})