const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/videos', { useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB..')) 
  .catch(err => console.log('Error: ', err));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

async function getGenres() {
    try {
        const result = await Genre.find();
        return result;
    }   
    catch (err) {
        console.log('Error: ', err);
        return err.message;
    }
}

async function  saveGenre(genre) {
    try {
        const result = await new Genre(genre).save();
        return result;
    }
    catch (err) {
        console.log('Error: ', err);
        return err.message;
    }
}

module.exports = {
    getGenres,
    saveGenre
};