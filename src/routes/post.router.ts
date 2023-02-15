import express from 'express'
import PostController from '../controllers/post.controller';

const router = express.Router();

const controller =new  PostController()
router.get("/", async (req, res) => {
    const response = await controller.getPosts();
    res.send(response);
})

router.post("/", async (req, res) => {
    const response = await controller.createPost(req.body);
    res.send(response)
})

router.get("/:id", async (req, res) => {
    const response = await controller.getPost(req.params.id);
    if (!response) res.status(404).send({ message: "No post found" });
    return res.send(response);
})

export default router;