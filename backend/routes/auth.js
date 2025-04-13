import express from 'express';
import { userSignup, userLogin, userLogout } from '../controllers/auth.js';
import userAuth from '../middlewares/userAuth.js';

const authRouter = express.Router();

authRouter.post('/signup', userSignup);
authRouter.post('/login', userLogin);
authRouter.post('/logout', userAuth ,userLogout);

export default authRouter;