import expres from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create } from '../controllers/post.controllers.js';

const router = expres.Router();

router.post('/create',verifyToken,create);


export default router;