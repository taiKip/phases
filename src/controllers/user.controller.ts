import { Get, Route, Tags, Post, Body, Path, Tags } from "tsoa";
import { User } from "../models";

import {
  getUser,
  getUsers,
  IUserPayload,
  createUser,
} from "../repositories/user";


@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Array<User>>{
        return getUsers()
    }
}
