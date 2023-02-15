import connectDB from "../config/database";
import { User } from "../models";

export interface IUserPayload{
    firstName: string;
    lastName: string;
    email: string;
}
const userRepository = connectDB.getRepository(User);
export const getUsers = async (): Promise<Array<User>> => {
   
    return userRepository.find();
}

export const createUser = async (payload: IUserPayload): Promise<User> => {
    const user = new User();
    return userRepository.save({
        ...user,
        ...payload,
    });
}

export const getUser = async (id: number): Promise<User | null> => {
    const user = await userRepository.findOneBy({ id: id });
    if (!user) return null
    return user;
}