import { Response } from "express";

const printRed = (text: string) => {
    console.log("\x1b[31m%s\x1b[0m", `${text} \n`);
};

const handleError = (
    response: Response,
    message: string,
    statusCode: number = 400
) => {
    return response.status(statusCode).json({ status: false, message });
};

const handleSuccess = (
    response: Response,
    message: string,
    data = {},
    statusCode: number = 200
) => {
    return response.status(statusCode).json({ status: true, message, data: { ...data } })

};

const Utility = {
    printRed,
    handleError,
    handleSuccess,
};

export default Utility;
