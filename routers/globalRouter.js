import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { logout, getJoin, postJoin, postLogin, getLogin } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); // 가입한 다음, 가입한 아이디로 바로 로그인 된 상태로 만들기 위해 postJoin을 middleware로 사용

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
