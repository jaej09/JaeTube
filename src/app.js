import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import passport from 'passport';

import { localsMiddleware } from './middlewares';
import apiRouter from './routers/apiRouter';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import routes from './routes';

import './passport';

// 미들웨어로 사용하기 위해서 import -> When we do app.use(passport), it will automatically look for any strategy on ./passport

const app = express();
const cookieStore = MongoStore(session);

// Middleware - Order matters
// 아래 모든 코드가 app object에 속한다.
app.use(helmet({ contentSecurityPolicy: false })); // Help secure Express/Connect apps with various HTTP headers
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 Middleware. request 정보에서 form이나 json 형태로 된 body를 검사한다.
app.use(morgan('dev'));
app.use(
  session({
    secret            : 'keyboard cat',
    resave            : false, // 세션을 강제로 저장되도록 함
    saveUninitialized : true, // 초기화되지 않은 세션을 저장소에 저장함
    cookie            : { secure: false },
    store             : new cookieStore({ mongooseConnection: mongoose.connection }) // mongoDB와 연결해야함
  })
);
app.use(passport.initialize()); // In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport.
app.use(passport.session()); // If your application uses persistent login sessions, passport.session() middleware must also be used.
app.use(localsMiddleware); // 제대로 사용하기 위해서는 아래 globalRouter, userRouter, videoRouter 보다 위에 위치해야 함.

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 라우터로 연결해줄 것이라서, app.get() 대신 app.use() 사용
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

// ES6 - 모듈이라는 것이 존재하고, 이 덕분에 코드를 공유힐 수 있다.
// app object를 export 했다.
export default app;
