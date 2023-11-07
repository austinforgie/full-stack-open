import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "../routes/api.js";
import infoRouter from "../routes/info.js";

morgan.token("body", (request) =>
  request.method === "POST" ? JSON.stringify(request.body) : null
);

const middlewareHandler = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static("dist"));
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :body"
    )
  );

  app.use("/", infoRouter);
  app.use("/api", apiRouter);

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
  };

  app.use(unknownEndpoint);

  const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformed id" });
    }

    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }

    next(error);
  };

  app.use(errorHandler);
};

export default middlewareHandler;
