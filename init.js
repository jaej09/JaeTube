import './db';
import app from './app'; // app.js에서 선언했던 app object 사용

const PORT = 4000;
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
