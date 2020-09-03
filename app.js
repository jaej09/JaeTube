import express from 'express'; // var express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

// Middleware - Order matters
// 아래 모든 코드가 app object에 속한다.
app.use(helmet()); // Help secure Express/Connect apps with various HTTP headers
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 Middleware. request 정보에서 form이나 json 형태로 된 body를 검사한다.
app.use(morgan('dev'));
app.use(localsMiddleware); // 제대로 사용하기 위해서는 아래 globalRouter, userRouter, videoRouter 보다 위에 위치해야 함.

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 라우터로 연결해줄 것이라서, app.get() 대신 app.use() 사용
app.use(routes.videos, videoRouter);

// ES6 - 모듈이라는 것이 존재하고, 이 덕분에 코드를 공유힐 수 있다.
// app object를 export 했다.
export default app;
