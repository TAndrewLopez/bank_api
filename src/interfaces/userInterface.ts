import { Model, Optional } from "sequelize";

export interface IUser {
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
    extends Optional<IUser, "createdAt" | "updatedAt"> { }



export interface IUserModel extends Model<IUser, IUserCreationBody>, IUser {
    id: number
}

export interface IUserDataSource {
    fetchOne(query: IFindUserQuery): Promise<IUser | null>;
    create(record: IUserCreationBody): Promise<IUser>;
}
