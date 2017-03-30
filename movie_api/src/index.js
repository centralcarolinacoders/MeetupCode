import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
import passporthttp from 'passport-http';

let app = express();
app.server = http.createServer(app);

// middleware

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

// all route authentication
passport.use(new passporthttp.BasicStrategy(
  (username, password, done) => {
    if ((username === 'allroutes') && (password === 'foo')) {
      return done(null, true);
    }

    return done(null, false);
  }
))

//app.use('/', )
// api routes v1
app.use('/v1', passport.authenticate('basic', {session: false}), routes);

app.server.listen(config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;
