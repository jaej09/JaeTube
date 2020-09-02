import express from 'express'; // var express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

// declare variables
const PORT = 4000;

const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('Hello from Home');
const handleProfile = (req, res) => res.send('Hello from Profile');

// Middleware - Order matters
app.use(helmet()); // Help secure Express/Connect apps with various HTTP headers
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', handleHome);
app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
