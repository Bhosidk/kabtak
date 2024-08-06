const express = require('express')
const app = express()
const db = require('./db').default

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person_routes');
app.use('/person', personRoutes);
const menuRoutes = require('./routes/menu_routes');
app.use('/menu', menuRoutes); // Use the router

app.get('/', function (req, res) {
  res.send('Hello Boy')
})

app.listen(PORT, () => {
  console.log('listening to port 3000');
})
