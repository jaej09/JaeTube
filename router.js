import express from 'express';

export const userRouter = express.Router(); // Export userRouter object

userRouter.get('/', (req, res) => res.send('user index'));
userRouter.get('/edit', (req, res) => res.send('user edit'));
userRouter.get('/pw', (req, res) => res.send('user password'));
