const { MONGODB_URI } = require("./utils/config");
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
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");

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

app.use(errorHandler);

module.exports = app;
