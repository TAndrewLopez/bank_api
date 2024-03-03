import { Model, Optional } from "sequelize";

export interface IUser {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: string;
  accountStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindUserQuery {
  where: {
    [key: string]: string;
  };
  raw?: boolean;
  returning: boolean;
}

export interface IUserCreationBody
  extends Optional<IUser, "id" | "createdAt" | "updatedAt"> { }

export interface IUserModel extends Model<IUser, IUserCreationBody>, IUser { }

export interface IUserDataSource {
  create(data: IUserCreationBody): Promise<IUser>;
  fetchOne(query: IFindUserQuery): Promise<IUser | null>;
  updateOne(query: IFindUserQuery, data: Partial<IUser>): Promise<void>;
}
