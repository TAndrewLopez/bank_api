import { IFindUserQuery, IUser, IUserCreationBody, IUserDataSource } from "../interfaces/userInterface";

class UserService {
    private userDataSource: IUserDataSource;

    constructor(_userDataSource: IUserDataSource) {
        this.userDataSource = _userDataSource;
    }

    async createUser(record: IUserCreationBody): Promise<IUser> {
        return this.userDataSource.create(record);
    }

    async getUserByField(record: Partial<IUser>): Promise<IUser | null> {
        const query = {
            where: {
                ...record,
            },
            raw: true,
        } as IFindUserQuery;
        return this.userDataSource.fetchOne(query);
    }
}

export default UserService;
