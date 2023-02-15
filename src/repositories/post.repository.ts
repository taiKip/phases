import connectDB from "../config/database";
import { Post } from "../models";

export interface IPostPayload{
    title: string;
    content: string;
    userId: number;
}

const postRepository = connectDB.getRepository(Post);
export const getPosts = async (): Promise<Array<Post>> => {
    return postRepository.find();
}

export const createPost = async (payload: IPostPayload): Promise<Post> => {
    const post = new Post();
    return postRepository.save({
        ...post,
        ...payload
    })
}

export const getPost = async (id: number): Promise<Post | null> => {
    const post = await postRepository.findOneBy({ id: id });
    if (!post)return null;
    return post;
}