import { IFindUserQuery, IUser, IUserCreationBody, IUserDataSource } from "../interfaces/userInterface";
import UserModel from "../models/userModel";

class UserDataSource implements IUserDataSource {
  async create(record: IUserCreationBody): Promise<IUser> {
    return await UserModel.create(record);
  }
  async fetchOne(query: IFindUserQuery): Promise<IUser | null> {
    return await UserModel.findOne(query);
  }
}

export default UserDataSource;
