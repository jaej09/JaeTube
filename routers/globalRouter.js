import express from 'express';
import passport from 'passport';

import { getJoin, getLogin, githubLogin, logout, postGithubLogIn, postJoin, postLogin } from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 가입한 다음, 가입한 아이디로 바로 로그인 된 상태로 만들기 위해 postJoin을 middleware로 사용

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: routes.login }), postGithubLogIn);

export default globalRouter;
