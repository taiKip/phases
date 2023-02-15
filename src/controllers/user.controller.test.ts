import UserController from "./user.controller";
import *  as UserRepository from "../repositories/user.repository"
import { generateUserData } from "../../test/utils/generate";

afterEach(() => {
    jest.resetAllMocks();
})
describe("UserController", () => {
    describe("getUsers", () => {
        test("Should return empty array ", async () => {
            //creating a spy of UserRepository.getUsers and changing its implementation to return a promise which will resolve as an empty array 
            //recreates the condition where the lisis empty in the database and we can easily test what will be the behavior of the method in this condition.
            //the original method is replaced with a mock function.
            const spy = jest
                .spyOn(UserRepository, "getUsers")
                .mockResolvedValueOnce([]);
            const controller = new UserController();
            const users = await controller.getUsers();
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
        test("Should return user list", async () => {
            const usersList = [
                {
                    id: 1,
                    firstName: "firstName",
                    lastName: "lastName",
                    email: "email@example.com",
                    posts: [],
                    comments: [],
                    createdAt: new Date(),
                    updatedAt: new Date()

                }
            ];
            const spy = jest
                .spyOn(UserRepository, "getUsers")
                .mockResolvedValueOnce(usersList);
            const controller = new UserController();
            const users = await controller.getUsers();
            expect(users).toEqual(usersList);
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
         
        })
    })
})

describe("addUser", () => {
    test("Should add user to the database", async () => {
        const payload = {
          firstName: "firstName",
          lastName: "lastName",
          email: "email@example.com",
        };
        const userData = {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "email@example.com",
          posts: [],
          comments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      
        const spy = jest
            .spyOn(UserRepository, "createUser")
            .mockResolvedValueOnce(userData)
        const controller = new UserController();
        const user = await controller.createUser(payload);
        expect(user).toMatchObject(payload);
        expect(user).toEqual(userData);
        expect(spy).toHaveBeenCalledWith(payload);
        expect(spy).toHaveBeenCalledTimes(1);
        
    })
})