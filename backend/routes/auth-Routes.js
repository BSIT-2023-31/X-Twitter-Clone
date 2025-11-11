import express from 'express'
import { getMe, LoginRoute, LogoutRoute, SignupRoute } from '../controlers/auth-controlers.js';
import { protecteRoute } from '../middleware/protectedRoute.js';

const router  =  express.Router();


router.post('/signup', SignupRoute);
router.post('/login',LoginRoute);
router.post('/logout', LogoutRoute);

router.get('/me',protecteRoute ,getMe );

export default router;