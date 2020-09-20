import mongoose from 'mongoose';
import dotevn from 'dotenv';
dotevn.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (err) => console.log(`❌ Error on DB connection: ${err}`);

db.once('open', handleOpen);
db.on('error', handleError);
