import express from 'express';
import passport from 'passport';

import {
  facebookLogin,
  getJoin,
  getLogin,
  getMe,
  githubLogin,
  logout,
  postFacebookLogin,
  postGithubLogIn,
  postJoin,
  postLogin
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Search Page
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 가입한 다음, 가입한 아이디로 바로 로그인 된 상태로 만들기 위해 postJoin을 middleware로 사용

// Login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// Logout
globalRouter.get(routes.logout, onlyPrivate, logout);

// Github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: routes.login }), postGithubLogIn);

// Facebook
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, passport.authenticate('facebook', { failureRedirect: routes.login }), postFacebookLogin);

// My Page
globalRouter.get(routes.me, getMe);

export default globalRouter;
