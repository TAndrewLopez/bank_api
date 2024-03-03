import express, { Request, Response } from "express";

import UserController from "../controllers/userController";
import TokenDataSource from "../dataSources/tokenDataSource";
import UserDataSource from "../dataSources/userDataSource";
import { validator } from "../middleware";
import ValidationSchema from "../schemas/userSchema";
import TokenService from "../services/tokenService";
import UserService from "../services/userService";

const createUserRoute = () => {
    const router = express.Router();
    const userService = new UserService(new UserDataSource());
    const tokenService = new TokenService(new TokenDataSource());
    const userController = new UserController(userService, tokenService);

    router.post("/register", validator(ValidationSchema.registerSchema), (request: Request, response: Response) => {
        return userController.register(request, response);
    });

    router.post("/login", validator(ValidationSchema.loginSchema), (request: Request, response: Response) => {
        return userController.login(request, response);
    });

    router.post(
        "/forgotPassword",
        validator(ValidationSchema.forgotPasswordSchema),
        (request: Request, response: Response) => {
            return userController.forgotPassword(request, response);
        }
    );

    router.post("/resetPassword",
        validator(ValidationSchema.resetPasswordSchema),
        (request: Request, response: Response) => {
            return userController.resetPassword(request, response);
        });

    return router;
};

export default createUserRoute();
