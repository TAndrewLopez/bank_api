import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
import UserService from "../services/userService";
import Utility from "../utils/index.utils";

const createUserRoute = () => {
    const router = express.Router();
    const userService = new UserService();
    const userController = new UserController(userService);

    Utility.printRed('POST: /api/user/register');
    router.post("/register", (request: Request, response: Response) => {
        return userController.register(request, response);
    });

    Utility.printRed('POST: /api/user/login');
    router.post("/login", (request: Request, response: Response) => {
        return userController.login(request, response);
    });

    Utility.printRed('POST: /api/user/forgotPassword');
    router.post("/forgotPassword", (request: Request, response: Response) => {
        return userController.forgotPassword(request, response);
    });

    Utility.printRed('POST: /api/user/resetPassword');
    router.post("/resetPassword", (request: Request, response: Response) => {
        return userController.resetPassword(request, response);
    });

    return router;
};

export default createUserRoute();
