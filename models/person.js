const { uniq } = require('lodash');
const mongoose = require('mongoose');
const brcypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: String,
    },

    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Owner'],
        required: true,
    },

    mobile: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
    },

    salary: {
        type: Number,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

personSchema.pre('save', async function (next) {
    const person = this;
    //hash the password only if it has been modifies or is new
    try {
        // hash password generation
        const salt = await brcypt.genSalt(10);
        // hash password
        const hashedPassword = await brcypt.hash(person.password, salt);
        //overide the plain password to hashed password
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await brcypt.compare(candidatePassword, this.password); 
        return isMatch;
    } catch (err) {
        throw err;
    }
}
// Create person model
const person = mongoose.model('person', personSchema);
module.exports = person;