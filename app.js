// setting express and handlebars
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

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

app.engine('hbs', exphbs({ defaultLayout : 'main', extname : '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({ name })
  // return Todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, ()=> {
  console.log('Server is running on http://localhost:3000')
})