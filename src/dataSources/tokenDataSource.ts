import {
    IFindTokenQuery,
    IToken,
    ITokenCreationBody,
    ITokenDataSource,
} from "../interfaces/tokenInterface";
import TokenModel from "../models/tokenModel";

class TokenDataSource implements ITokenDataSource {
    async create(data: ITokenCreationBody): Promise<IToken> {
        return await TokenModel.create(data);
    }
    async fetchOne(query: IFindTokenQuery): Promise<IToken | null> {
        return await TokenModel.findOne(query);
    }
    async updateOne(
        query: IFindTokenQuery,
        data: Partial<IToken>
    ): Promise<void> {
        await TokenModel.update(data, query);
    }
}

export default TokenDataSource;
