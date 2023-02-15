import express from 'express'
import PingController from '../controllers/ping'
import UserRouter from './user.router'
import CommentRouter from './comment.router'
import PostRouter from './post.router'

const router = express.Router();


router.get("/ping", async (req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response)
})

router.use("/users",UserRouter)
router.use('/comments', CommentRouter)
router.use("/posts",PostRouter)
export default router;