import bodyParser from 'body-parser';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

import { localsMiddleware } from './middlewares';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import routes from './routes';

import './passport';

const app = express();
const cookieStore = mongoStore(session);

// Middleware - Order matters
// 아래 모든 코드가 app object에 속한다.
app.use(helmet({ contentSecurityPolicy: false })); // Help secure Express/Connect apps with various HTTP headers
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 Middleware. request 정보에서 form이나 json 형태로 된 body를 검사한다.
app.use(morgan('dev'));
app.use(
  session({
    secret            : 'keyboard cat',
    resave            : false,
    saveUninitialized : true,
    cookie            : { secure: false },
    store             : new cookieStore({ mongooseConnection: mongoose.connection }) // mongoDB와 연결해야함
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware); // 제대로 사용하기 위해서는 아래 globalRouter, userRouter, videoRouter 보다 위에 위치해야 함.

// Routers
app.use('/uploads', express.static('uploads')); // 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하면 된다. express.static 사용하면 URL 접근이 아닌 directory 접근을 한다. 여기서는 uploads 라는 directory 에 접근한다.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 라우터로 연결해줄 것이라서, app.get() 대신 app.use() 사용
app.use(routes.videos, videoRouter);

// ES6 - 모듈이라는 것이 존재하고, 이 덕분에 코드를 공유힐 수 있다.
// app object를 export 했다.
export default app;
