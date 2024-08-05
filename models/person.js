const { uniq } = require('lodash');
const mongoose = require('mongoose');

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
});

// Create person model

const person = mongoose.model('person', personSchema);

module.exports = person;