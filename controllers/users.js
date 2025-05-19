import User from '../models/user.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('devices.device', { model: 1 });

    response.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default userRouter;
