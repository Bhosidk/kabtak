const express = require('express');
const router = express.Router();
const person = require('./../models/person');

//Get method to get the perosn
router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

router.get('/:workType', async (req, res) => {

    try {
        const workType = req.params.workType; //Extract the workType from the URl Parameter
        if (workType == 'Chef' || workType == 'Waiter' || workType == 'Owner') {
            const response = await person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// Post route to add a peroson
router.post('/', async (req, res) => {

    try {
        const data = req.body; // Assuming the request body contains the person data
        const newPerson = new person(data); // Create a new person documents using Mongoose model

        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

router.put('/:id', async (req, res) => {

    try {
        const personId = req.params.id; // Extract the ID from the URL parametre
        const updatedPersonData = req.body; // Update data for the person

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Retrun the updated document
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the ID from the URL parametre
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});
module.exports = router;