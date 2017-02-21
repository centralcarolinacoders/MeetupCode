import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import movie from '../controller/movie';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/movie', movie({ config, db }));
});

export default router;
