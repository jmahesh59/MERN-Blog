import expres from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create ,getposts ,deletepost} from '../controllers/post.controllers.js';

const router = expres.Router();

router.post('/create',verifyToken,create);
router.get("/getPosts",getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
export default router;