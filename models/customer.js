const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true
    }
}));

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().required()
    }

    return Joi.validate(customer, schema);
}

module.exports = {
    Customer,
    validateCustomer
};