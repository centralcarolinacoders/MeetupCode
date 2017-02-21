import mongoose from 'mongoose';
import Review from './review';
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
 director : String,
 reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('Movie', MovieSchema);
