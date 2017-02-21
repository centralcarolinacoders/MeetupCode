import mongoose from 'mongoose';
import Movie from './movie';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: String,
  text: String,
  movie: {type: Schema.Types.ObjectId, ref: 'Movie'}
});

module.exports = mongoose.model('Review', ReviewSchema);
