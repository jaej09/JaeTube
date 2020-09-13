import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/youtube-clone', { useNewUrlParser: true, useUnifiedTopology: false });

const db = mongoose.connection;
const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (err) => console.log(`❌ Error on DB connection: ${err}`);

db.once('open', handleOpen);
db.on('error', handleError);
