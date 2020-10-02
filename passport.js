import passport from 'passport';
import GitHubStrategy from 'passport-github';
import { githubLoginCallback } from './controllers/userController';

import User from './models/User';

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID     : process.env.GITHUB_CLIENT_ID,
      clientSecret : process.env.GITHUB_CLIENT_SECRET,
      callbackURL  : 'http://localhost:4000/auth/github/callback'
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
