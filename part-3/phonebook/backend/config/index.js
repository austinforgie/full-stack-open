import middlewareHandler from "../middlewares/handler.js";
import { config } from "dotenv";

config();

const DEFAULT_PORT = "3001";
const PORT = process.env.PORT || DEFAULT_PORT;

const configureApp = (app) => middlewareHandler(app);

export { configureApp, PORT };
