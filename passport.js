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

// passport-local-mongoose 덕분에 코드가 짧아짐
// user.id 값만 쿠키에 포함됨
passport.serializeUser(User.serializeUser()); // 클라이언트에 있는 사용자에 대한 어떠한 정보들이 쿠키에 포함될 것인지 알려주는 역할 (많은 정보를 주지 않는 것이 좋다. 누군가가 접근할 수도 있기 때문에, 쿠키는 아주 작아야하고, 민감한 정보가 담겨있어서는 안된다.)
passport.deserializeUser(User.deserializeUser()); // 쿠키를 통해 받은 정보에 해당하는 사용자를 찾는 역할
