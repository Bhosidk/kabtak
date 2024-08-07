const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require ('./../jwt');

//Get method to get the perosn
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// Profile route

router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
    try {
        const userData = req.user;
        console.log("User Data: ", userData);
        const userId = userData.id;
        const user = await person.findById(userId);

        res.status(200).json({user});
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
router.post('/signup', async (req, res) => {

    try {
        const data = req.body; // Assuming the request body contains the person data
        const newPerson = new person(data); // Create a new person documents using Mongoose model

        const response = await newPerson.save();
        console.log('Data Saved');
        
        const payload ={
            id: response.id,
            usrername: response.username,
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

// Login route

router.post('/login', async (req, res) => {
try {
    // Extract username and password from request body
    const {username, password} = req.body;
    // Find user by name
    const user = await person.findOne({username: username});
    // If user doesnt exist or passwrod does not match, return error
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid username or password'});
    }

    // Generate Token
    const payload = {
        id: user.id,
        username: user.username,
    }
    const token = generateToken(payload);
    // Return toekn as response
    res.json({token})
} catch (error) {
    console.error(err);
    res.status(500).json({error: 'Internal server error'});
}
})

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