import express from "express";
import { configureApp, PORT } from "./config/index.js";

const app = express();

configureApp(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
