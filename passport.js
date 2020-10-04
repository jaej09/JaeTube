import dotevn from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github';

import { facebookLoginCallback, githubLoginCallback } from './controllers/userController';
import User from './models/User';
import routes from './routes';

dotevn.config();

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID     : process.env.GITHUB_ID,
      clientSecret : process.env.GITHUB_SECRET,
      callbackURL  : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID      : process.env.FACEBOOK_ID,
      clientSecret  : process.env.FACEBOOK_SECRET,
      callbackURL   : `http://localhost:4000${routes.facebookCallback}`,
      profileFields : [
        'id',
        'displayName',
        'photos',
        'email'
      ],
      scope         : [
        'public_profile',
        'email'
      ]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
