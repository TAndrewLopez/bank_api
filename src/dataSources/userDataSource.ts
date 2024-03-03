import {
  IFindUserQuery,
  IUser,
  IUserCreationBody,
  IUserDataSource,
} from "../interfaces/userInterface";
import UserModel from "../models/userModel";

class UserDataSource implements IUserDataSource {
  async create(data: IUserCreationBody): Promise<IUser> {
    return await UserModel.create(data);
  }

  async fetchOne(query: IFindUserQuery): Promise<IUser | null> {
    return await UserModel.findOne(query);
  }

  async updateOne(query: IFindUserQuery, data: Partial<IUser>) {
    await UserModel.update(data, query);
  }
}

export default UserDataSource;
