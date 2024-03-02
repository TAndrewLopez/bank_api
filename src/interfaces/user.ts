import { Model, Optional } from "sequelize";

export interface IUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    accountStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreationBody extends Optional<IUser, "id" | "createdAt" | "updatedAt"> { }

export interface IUserModel extends Model<IUser, IUserCreationBody>, IUser { }