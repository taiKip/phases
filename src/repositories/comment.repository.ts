import connectDB from "../config/database";
import { Comment } from "../models";

export interface ICommentPayload{
    content: string;
    userId: number;
    postId: number;
}

const commentRepository = connectDB.getRepository(Comment);
export const getComments = async (): Promise<Array<Comment>> => {
    return commentRepository.find();
}


export const createComment = async (payload: ICommentPayload): Promise<Comment> => {
    const comment = new Comment();
    return commentRepository.save({
        ...comment,
        ...payload
    })
}


export const getComment = async (id: number): Promise<Comment | null> => {
    const comment = await commentRepository.findOneBy({ id: id });
    if (!comment) return null;
    return comment;
}