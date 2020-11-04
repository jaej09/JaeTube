// app.js에서 선언했던 app object 사용
import dotevn from 'dotenv';

import app from './app';

// To let mongoose know about models
import './db';
import './models/Comment';
import './models/Video';

// import '@babel/polyfill'; => deprecated 되었기 때문에 아래 코드로 변경함
// https://babeljs.io/docs/en/babel-polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

dotevn.config();

const PORT = process.env.PORT;
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
