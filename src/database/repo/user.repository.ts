import userRepoModel from '../../schemas/user.schema';
import { IUserDocument } from "../../schemas/user.schema";

export async function findUserById(userId: string): Promise<IUserDocument | any> {
    return userRepoModel.findOne({ _id: userId });
}