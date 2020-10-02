// app.js에서 선언했던 app object 사용
import dotevn from 'dotenv';

import app from './app';

import './db';
import './models/Comment';
import './models/Video';

dotevn.config();

const PORT = process.env.PORT;
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
