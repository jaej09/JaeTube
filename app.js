import express from 'express'; // var express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

// Middleware - Order matters
// 아래 모든 코드가 app object에 속한다.
app.use(helmet()); // Help secure Express/Connect apps with various HTTP headers
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter); // 라우터로 연결해줄 것이라서, app.get() 대신 app.use() 사용
app.use(routes.videos, videoRouter);

// ES6 - 모듈이라는 것이 존재하고, 이 덕분에 코드를 공유힐 수 있다.
// app object를 export 했다.
export default app;
