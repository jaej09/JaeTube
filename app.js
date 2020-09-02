import express from 'express'; // var express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { userRouter } from './router'; // default로 export 하지 않았기 때문에 import 할 때 { } 사용

const app = express();

const handleHome = (req, res) => res.send('Hello from Home');
const handleProfile = (req, res) => res.send('Hello from Profile');

// Middleware - Order matters
// 아래 모든 코드가 app object에 속한다.
app.use(helmet()); // Help secure Express/Connect apps with various HTTP headers
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', handleHome);
app.get('/profile', handleProfile);
app.use('/user', userRouter); // 라우터로 연결해줄 것이라서, app.get() 대신 app.use() 사용

// ES6 - 모듈이라는 것이 존재하고, 이 덕분에 코드를 공유힐 수 있다.
// app object를 export 했다.
export default app;
