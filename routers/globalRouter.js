import express from 'express';
import routes from './../routes';

const globalRouter = express.Router();

userRouter.get(routes.home, (req, res) => res.send('Home'));
userRouter.get(routes.join, (req, res) => res.send('Join'));
userRouter.get(routes.login, (req, res) => res.send('Login'));
userRouter.get(routes.logout, (req, res) => res.send('Logout'));
userRouter.get(routes.search, (req, res) => res.send('Search'));

export default globalRouter;
