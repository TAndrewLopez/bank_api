import {
    IFindUserQuery,
    IUser,
    IUserCreationBody,
    IUserDataSource,
} from "../interfaces/userInterface";

class UserService {
    private userDataSource: IUserDataSource;

    constructor(_userDataSource: IUserDataSource) {
        this.userDataSource = _userDataSource;
    }

    async createUser(data: IUserCreationBody): Promise<IUser> {
        return this.userDataSource.create(data);
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

    async updateRecord(
        searchBy: Partial<IUser>,
        data: Partial<IUser>
    ): Promise<void> {
        const query = { where: { ...searchBy }, raw: true } as IFindUserQuery;
        await this.userDataSource.updateOne(query, data);
    }
}

export default UserService;
