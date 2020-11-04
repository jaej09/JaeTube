import dotevn from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github';

import { facebookLoginCallback, githubLoginCallback } from './controllers/userController';
import User from './models/User';
import routes from './routes';

dotevn.config();

// passport.use("strategy")를 구성하는 것이 본래 맞으나, passport-local-mongoose는 createStrategy 메서드를 제공함
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
passport.serializeUser(User.serializeUser()); // 클라이언트에 있는 사용자에 대한 어떠한 정보들이 쿠키에 포함될 것인지 알려주는 역할 -> user.id 값만 쿠키에 포함됨 (많은 정보를 주지 않는 것이 좋다. 누군가가 접근할 수도 있기 때문에, 쿠키는 아주 작아야하고, 민감한 정보가 담겨있어서는 안된다.)
passport.deserializeUser(User.deserializeUser()); // serialize에서 웹 브라우저 쿠키에 user.id를 주었고 그 쿠키의 정보를 사용자로 전환하는 역할

/** http://www.passportjs.org/docs/downloads/html/
 * Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. 
 * In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
 * In this example, only the user ID is serialized to the session,keeping the amount of data stored within the session small.  
 * When subsequent requests are received, this ID is used to find the user, which will be restored to req.user. */
