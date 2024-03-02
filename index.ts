import express, {
    Request,
    Response,
    Express,
    NextFunction,
    response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import db_init from "./src/db/init";
import UserRouter from "./src/router/userRouter";

const app = express();

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    (
        err: TypeError,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            if (err) {
                response
                    .status(500)
                    .json({ status: false, message: (err as TypeError).message });
            }
        } catch (error) { }
    }
);

app.use("/api/user", UserRouter);

app.get("/", (request: Request, response: Response) => {
    response.send(`Welcome to ${process.env.APP_NAME}`);
});

const PORT = process.env.DB_PORT || 5000;

const Bootstrap = async () => {
    try {
        await db_init();
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}. 🚀`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

Bootstrap();
