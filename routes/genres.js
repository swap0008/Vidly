const { Genre, validateGenre } = require('../models/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);  
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre)
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        name: req.body.name
      }
    }, { new: true });
    res.send(genre);
  }
  catch (err) {
    res.status(404).send('The genre with the given ID was not found.');
    console.log(err.message);
  }  
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findOneAndRemove({ _id: req.params.id });
    res.send(genre);
  }
  catch (err) {
    console.log(err.message);
    res.status(404).send('The genre with the given ID was not found.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.find({ _id: req.params.id });
    res.send(genre);
  }
  catch (err) {
    console.log(err.message)
    res.status(404).send('The genre with the given ID was not found.');
  }
});

module.exports = router;