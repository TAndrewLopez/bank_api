import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

import { ResponseCode } from "../interfaces/enum/responseCodeEnum";
import Utility from "../utils/index.utils";

export const validator = (schema: Schema<any>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.validate(request.body, { abortEarly: false });
            next();
        } catch (error: any) {
            return Utility.handleError(response, error.errors[0], ResponseCode.BAD_REQUEST);
        }
    };
};
