import CommentController from './comment.controller'
import * as CommentRepository from '../repositories/comment.repository'
import { User ,Post} from '../models';


afterEach(() => {
    jest.resetAllMocks();
})

const payload = {
    content: "awesome",
    userId: 1,
    postId: 1
}

const commentData = {
    id:1,
    ...payload,
    user: new User(),
    createdAt: new Date(),
    updatedAt: new Date(),
post:new Post()
}

const controller = new CommentController();
describe("CommentController", () => {
    describe("getComments", () => {
        test("should return empty array", async () => {
            const spy = jest
                .spyOn(CommentRepository, "getComments")
                .mockResolvedValueOnce([])
            const comments = await controller.getComments();
            expect(comments).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1)
        });

        test("should return comments list", async()=> {
            const commentsData = [{ ...commentData }];
            const spy = jest
                .spyOn(CommentRepository, "getComments")
                .mockResolvedValueOnce(commentsData)
            const comments = await controller.getComments();
            expect(comments).toEqual(commentsData);
            expect(spy).toHaveBeenCalledWith()
            expect(spy).toHaveBeenCalledTimes(1)
})
    })
    describe("createComment", () => {
        test("should add comment to the database", async () => {
            const spy = jest
                .spyOn(CommentRepository, "createComment")
                .mockResolvedValueOnce(commentData);
            const comment = await controller.createComment(payload);
            expect(comment).toMatchObject(payload);
            expect(comment).toEqual(commentData);
            expect(spy).toHaveBeenCalledWith(payload);
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
    describe("getComment", () => {
        test("Should return comment from the database", async () => {
            const id = 1;
            const spy = jest
                .spyOn(CommentRepository, "getComment")
                .mockResolvedValueOnce(commentData)
            const comment = await controller.getComment(id.toString());
            expect(comment).toEqual(commentData);
            expect(comment?.id).toBe(id);
            expect(spy).toHaveBeenCalledWith(id);
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test("Should return null if comment not found", async () => {
            const id = 1;
            const spy = jest
                .spyOn(CommentRepository, "getComment")
                .mockResolvedValueOnce(null)
            const comment = await controller.getComment(id.toString());
            expect(comment).toBeNull();
            expect(spy).toHaveBeenCalledWith(id);
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})