const mongoose = require('mongoose');

// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = 'mongodb+srv://ninjaeverytime:Qwerty12345@node.2idgxrx.mongodb.net/';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
})

db.on('error', (err)=>{
    console.log('MongoDB connection error:', err);
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})

module.exports = db;


