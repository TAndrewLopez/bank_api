import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { ResponseCode } from "../interfaces/enum/codeEnum";
import {
    AccountStatus,
    EmailStatus,
    UserRole,
} from "../interfaces/enum/userEnum";
import { IUserCreationBody } from "../interfaces/userInterface";
import UserService from "../services/userService";
import Utility from "../utils/index.utils";

class UserController {
    private userService: UserService;

    constructor(_userService: UserService) {
        this.userService = _userService;
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
            response.send({ message: "Server error." });
        }
    }

    async login(request: Request, response: Response) {
        try {
            response.send({ message: "Login successful." });
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }

    async forgotPassword(request: Request, response: Response) {
        try {
            response.send({ message: "Forgot password email delivered." });
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }

    async resetPassword(request: Request, response: Response) {
        try {
            response.send({ message: "Reset password successful." });
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }
}

export default UserController;
