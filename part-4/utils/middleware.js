const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");

  next();
};

const errorHandler = (error, request, response, next) => {
  const { message, name } = error;

  logger.error(message);

  if (name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (name === "ValidationError") {
    return response.status(400).send({ error: message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  } else request.token = null;

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }

  request.user = await User.findById(decodedToken.id);

  next();
};

module.exports = { requestLogger, errorHandler, tokenExtractor, userExtractor };
