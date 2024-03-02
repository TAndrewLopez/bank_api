import express, {
    Request,
    Response,
    Express,
    NextFunction,
    response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.get("/", (request: Request, response: Response) => {
    response.send(`Welcome to ${process.env.APP_NAME}`);
});

const PORT = process.env.PORT || 5000;

const Bootstrap = async () => {
    try {
        app.listen(PORT, () => {
            console.log("Connected has been established successfully. 🚀");
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

Bootstrap();
