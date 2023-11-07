require("dotenv").config();
const { MONGODB_URI, NODE_ENV } = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");

if (NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

mongoose.set("strictQuery", false);

logger.info("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) =>
    logger.error("error connecting to MongoDB:", error.message)
  );

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
