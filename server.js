const express = require('express')
const app = express()
const db = require('./db').default

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person_routes');
app.use('/person', personRoutes);
const menuRoutes = require('./routes/menu_routes');
app.use('/menu', menuRoutes); // Use the router

app.get('/', function (req, res) {
  res.send('Hello Boy')
})

app.listen(3000, () => {
  console.log('listening to port 3000');
})

// ...
