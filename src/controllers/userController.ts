import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
    private userService: UserService;

    constructor(_userService: UserService) {
        this.userService = _userService;
    }

    async register(request: Request, response: Response) {
        try {
            response.send({ message: "Registration successful." });
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }

    async login(request: Request, response: Response) {
        try {
            response.send({ message: "Login successful." })
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }

    async forgotPassword(request: Request, response: Response) {
        try {
            response.send({ message: "Forgot password email delivered." })
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }
    
    async resetPassword(request: Request, response: Response) {
        try {
            response.send({ message: "Reset password successful." })
        } catch (error) {
            response.send({ message: "Server error." });
        }
    }
}

export default UserController;
