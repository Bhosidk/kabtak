const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu_item');


router.get('/', async (req, res) => {

    try {
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server error' });
    }
  })
  
  router.post('/', async (req, res) => {
  
    try {
      const data = req.body; // Assuming the request body contains the person data
      const newMenuItem = new MenuItem(data); // Create a new person documents using Mongoose model
  
      const response = await newMenuItem.save();
      console.log('Data Saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server error' });
    }
  });

  module.exports = router;

  