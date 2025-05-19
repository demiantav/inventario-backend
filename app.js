import mongoose from 'mongoose';
import config from './utils/config.js';
import express from 'express';
import migrateDb from './utils/migrateDb.js';
import deviceRouter from './controllers/devices.js';
import userRouter from './controllers/users.js';

const app = express();

mongoose.set('strictQuery', false);

console.info('Connecting to Mongoose...');

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log('Connection Ok!');
    // migrateDb();
  })
  .catch((error) => {
    console.error(error);
  });

app.use('/api/devices', deviceRouter);
app.use('/api/users', userRouter);

export default app;
