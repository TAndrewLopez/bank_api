import express, { Request, Response } from "express";

import UserController from "../controllers/userController";
import UserService from "../services/userService";
import { validator } from "../middleware";
import ValidationSchema from "../validators/userValidatorSchema";
import UserDataSource from "../dataSources/userDataSource";

const createUserRoute = () => {
    const router = express.Router();
    const userService = new UserService(new UserDataSource());
    const userController = new UserController(userService);

    router.post(
        "/register",
        validator(ValidationSchema.registerSchema),
        (request: Request, response: Response) => {
            return userController.register(request, response);
        }
    );

    router.post("/login", (request: Request, response: Response) => {
        return userController.login(request, response);
    });

    router.post("/forgotPassword", (request: Request, response: Response) => {
        return userController.forgotPassword(request, response);
    });

    router.post("/resetPassword", (request: Request, response: Response) => {
        return userController.resetPassword(request, response);
    });

    return router;
};

export default createUserRoute();
