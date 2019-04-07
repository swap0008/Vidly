const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);  
});
  
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer)
});
  
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Genre.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }}, { new: true });
        res.send(customer);
    }
    catch (err) {
        res.status(404).send('The customer with the given ID was not found.');
        console.log(err.message);
    }  
});
  
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndRemove({ _id: req.params.id });
        res.send(customer);
    }
    catch (err) {
        console.log(err.message);
        res.status(404).send('The customer with the given ID was not found.');
    }
});
  
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.find({ _id: req.params.id });
        res.send(customer);
    }
    catch (err) {
        console.log(err.message)
        res.status(404).send('The customer with the given ID was not found.');
    }
});

module.exports = router;