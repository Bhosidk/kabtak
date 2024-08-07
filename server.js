const express = require('express');
const app = express();
const db = require('./db').default;
const passport = require('./auth');

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] request made to URL: ${req.originalUrl}`);
  next();
}
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddeleware = passport.authenticate('local', {session: false});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person_routes');
app.use('/person',logRequest, personRoutes);
const menuRoutes = require('./routes/menu_routes');
const person = require('./models/person');
app.use('/menu', menuRoutes); // Use the router


app.get('/',localAuthMiddeleware,function (req, res) {
  res.send('Hello Boy')
})

app.listen(PORT, () => {
  console.log('listening to port 3000');
})
