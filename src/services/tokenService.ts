import moment from "moment";
import TokenDataSource from "../dataSources/tokenDataSource";
import { IFindTokenQuery, IToken, ITokenCreationBody } from "../interfaces/tokenInterface";
import Utility from "../utils/index.utils";

class TokenService {
    private tokenDataSource: TokenDataSource;
    private readonly tokenExpires: number = 5;

    public TokenTypes = {
        FORGOT_PASSWORD: "FORGOT_PASSWORD",
    };

    public TokenStatus = {
        NEW: "NEW",
        USED: "USED",
    };

    constructor(_tokenDataSource: TokenDataSource) {
        this.tokenDataSource = _tokenDataSource;
    }

    async getTokenByField(record: Partial<IToken>): Promise<IToken | null> {
        const query = { where: { ...record }, raw: true } as IFindTokenQuery;
        return this.tokenDataSource.fetchOne(query);
    }

    async createForgotPasswordToken(email: string): Promise<IToken | null> {
        const tokenData = {
            key: email,
            type: this.TokenTypes.FORGOT_PASSWORD,
            expires: moment().add(this.tokenExpires, "minutes").toDate(),
            status: this.TokenStatus.NEW,
        } as ITokenCreationBody;
        const token = await this.createToken(tokenData);
        return token;
    }

    async createToken(record: ITokenCreationBody) {
        const tokenData = { ...record };
        let validCode = false;

        while (!validCode) {
            tokenData.code = Utility.generateCode(6);
            const codeExists = await this.getTokenByField({ code: tokenData.code });
            if (!codeExists) {
                validCode = true;
                break;
            }
        }
        return this.tokenDataSource.create(tokenData);
    }
}

export default TokenService;
