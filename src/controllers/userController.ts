import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";

import { ResponseCode } from "../interfaces/enum/responseCodeEnum";
import {
    AccountStatus,
    EmailStatus,
    UserRole,
} from "../interfaces/enum/userEnum";
import { IUserCreationBody } from "../interfaces/userInterface";
import UserService from "../services/userService";
import Utility from "../utils/index.utils";
import TokenService from "../services/tokenService";
import EmailService from "../services/emailService";
import { IToken } from "../interfaces/tokenInterface";
import moment from "moment";

class UserController {
    private userService: UserService;
    private tokenService: TokenService;

    constructor(_userService: UserService, _tokenService: TokenService) {
        this.userService = _userService;
        this.tokenService = _tokenService;
    }

    async register(request: Request, response: Response) {
        try {
            const params = { ...request.body };
            const newUser = {
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                password: bcrypt.hashSync(params.password, 10),
                username: params.email.split("@")[0],
                role: UserRole.CUSTOMER,
                isEmailVerified: EmailStatus.UNVERIFIED,
                accountStatus: AccountStatus.INACTIVE,
            } as IUserCreationBody;

            let userExists = await this.userService.getUserByField({
                email: newUser.email,
            });

            if (userExists) {
                Utility.handleError(
                    response,
                    "Email already exists.",
                    ResponseCode.ALREADY_EXISTS
                );
            }

            let user = await this.userService.createUser(newUser);
            user.password = "";

            return Utility.handleSuccess(
                response,
                "User registered successfully.",
                { user },
                ResponseCode.SUCCESS
            );
        } catch (error) {
            return Utility.handleError(
                response,
                (error as TypeError).message,
                ResponseCode.SERVER_ERROR
            );
        }
    }

    async login(request: Request, response: Response) {
        try {
            const params = { ...request.body };
            const user = await this.userService.getUserByField({
                email: params.email,
            });

            if (!user) {
                return Utility.handleError(
                    response,
                    "Invalid Credentials.",
                    ResponseCode.NOT_FOUND
                );
            }

            const passwordMatches = await bcrypt.compare(
                params.password,
                user.password
            );

            if (!passwordMatches) {
                return Utility.handleError(
                    response,
                    "Invalid Credentials.",
                    ResponseCode.NOT_FOUND
                );
            }

            const token = JWT.sign(
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_KEY as string,
                {
                    expiresIn: "30d",
                }
            );

            return Utility.handleSuccess(
                response,
                "Login Successful.",
                { user, token },
                ResponseCode.SUCCESS
            );
        } catch (error) {
            return Utility.handleError(
                response,
                (error as TypeError).message,
                ResponseCode.SERVER_ERROR
            );
        }
    }

    async forgotPassword(request: Request, response: Response) {
        try {
            const params = { ...request.body };
            const user = await this.userService.getUserByField({
                email: params.email,
            });

            if (!user) {
                return Utility.handleError(
                    response,
                    "Account does not exist.",
                    ResponseCode.NOT_FOUND
                );
            }

            const token = (await this.tokenService.createForgotPasswordToken(
                user.email
            )) as IToken;

            await EmailService.sendForgotPasswordEmail(user.email, token.code);

            return Utility.handleSuccess(
                response,
                "Forgot password reset code has been emailed.",
                {},
                ResponseCode.SUCCESS
            );
        } catch (error) {
            return Utility.handleError(
                response,
                (error as TypeError).message,
                ResponseCode.SERVER_ERROR
            );
        }
    }

    async resetPassword(request: Request, response: Response) {
        try {
            const params = { ...request.body };
            const isValidToken = await this.tokenService.getTokenByField({
                key: params.email,
                code: params.code,
                type: this.tokenService.TokenTypes.FORGOT_PASSWORD,
                status: this.tokenService.TokenStatus.NEW,
            });

            if (!isValidToken) {
                return Utility.handleError(
                    response,
                    "Token has expired.",
                    ResponseCode.NOT_FOUND
                );
            }

            if (
                isValidToken &&
                moment(isValidToken.expires).diff(moment(), "minute") <= 0
            ) {
                return Utility.handleError(
                    response,
                    "Token has expired.",
                    ResponseCode.NOT_FOUND
                );
            }

            let user = await this.userService.getUserByField({ email: params.email });

            if (!user) {
                return Utility.handleError(
                    response,
                    "Invalid User record.",
                    ResponseCode.NOT_FOUND
                );
            }

            const _password = bcrypt.hashSync(params.password, 10);

            await this.userService.updateRecord(
                { id: user.id },
                { password: _password }
            );

            await this.tokenService.updateRecord(
                { id: isValidToken.id },
                {
                    status: this.tokenService.TokenStatus.USED,
                }
            );

            return Utility.handleSuccess(
                response,
                "Password reset successful.",
                {},
                ResponseCode.SUCCESS
            );
        } catch (error) {
            return Utility.handleError(
                response,
                (error as TypeError).message,
                ResponseCode.SERVER_ERROR
            );
        }
    }
}

export default UserController;
