import './db';
import './models/Video';
import './models/Comment';
import app from './app'; // app.js에서 선언했던 app object 사용
import dotevn from 'dotenv';
dotevn.config();

const PORT = process.env.PORT;
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
