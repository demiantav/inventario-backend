import Device from '../models/device.js';
import { Router } from 'express';

const deviceRouter = Router();

deviceRouter.get('/', async (request, response, next) => {
  try {
    const devices = await Device.find({});

    response.json(devices);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default deviceRouter;
