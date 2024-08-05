const { uniq } = require('lodash');
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    price: {
        type: Number,
        required: true
    },

    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
        required: true,
    },

    is_Drink: {
        type: Boolean,
        default: false,
    },

    ingredients: {
        type: String,
        default: [],
    },

    num_sales: {
        type: Number,
        default: 0,
    },

});

// Create person model

const MenuItem = mongoose.model('menu', menuItemSchema);

module.exports = MenuItem;