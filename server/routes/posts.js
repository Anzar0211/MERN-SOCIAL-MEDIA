import Express  from "express";
import { getPost,getPosts,createPost,updatePost,deletePost,likePost,getPostsBySearch,commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router=Express.Router();
router.get('/:id',getPost)
router.get('/',getPosts)
router.get('/search',getPostsBySearch)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)
export default router;