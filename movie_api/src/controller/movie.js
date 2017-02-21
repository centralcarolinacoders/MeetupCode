import mongoose from 'mongoose';
import { Router } from 'express';
import Movie from '../model/movie';
import Review from '../model/review';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // '/v1/movie' - GET all movies
  api.get('/', (req, res) => {
    Movie.find({}, (err, movies) => {
      if (err) {
        res.send(err);
      }
      res.json(movies);
    });
  });

  // '/v1/movie/:id' - GET a specific movie
  api.get('/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  });

  // '/v1/movie/add' - POST - add a movie
  api.post('/add', (req, res) => {
    let newMovie = new Movie();
    newMovie.title = req.body.title;
    newMovie.genre = req.body.genre;
    newMovie.rating = req.body.rating;
    newMovie.director = req.body.director;

    newMovie.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Movie added successfully' });
    });
  });

  // '/v1/movie/:id' - DELETE - remove a movie
  api.delete('/:id', (req, res) => {
    Movie.remove({
      _id: req.params.id
    }, (err, movie) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        movie: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Movie and Reviews Successfully Removed"});
      });
    });
  });

  // '/v1/movie/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      if (err) {
        res.send(err);
      }
      movie.title = req.body.title;
      movie.genre = req.body.genre;
      movie.rating = req.body.rating;
      movie.director = req.body.director;
      movie.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Movie info updated' });
      });
    });
  });

  // add a review by a specific movie id
  // '/v1/movie/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.movie = movie._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        movie.reviews.push(newReview);
        movie.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Movie review saved' });
        });
      });
    });
  });

  // get reviews for a specific movie id
  // '/v1/movie/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({movie: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
