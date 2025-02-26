import mongoose from "mongoose";
import config from './utils/config.js'
import express from 'express'

const app = express();

mongoose.set('strictQuery', false)

console.info('Connecting to Mongoose...')

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connection Ok!")
  })
  .catch((error) => {
    console.error(error)
  })

export default app;
