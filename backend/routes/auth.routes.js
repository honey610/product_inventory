import Router from 'express';
import {register,login,getAllUsers} from '../controllers/auth.controller.js';


const router=Router();

router.post('/register',register);
router.get('/users',getAllUsers);
router.post('/login',login);


export default router;