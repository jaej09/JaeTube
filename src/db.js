import dotevn from 'dotenv';
import mongoose from 'mongoose';

dotevn.config();

mongoose.connect(process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL, {
  useCreateIndex     : true,
  useNewUrlParser    : true,
  useUnifiedTopology : true
});

const db = mongoose.connection;
const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (err) => console.log(`❌ Error on DB connection: ${err}`);

db.once('open', handleOpen);
db.on('error', handleError);
