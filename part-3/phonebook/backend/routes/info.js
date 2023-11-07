import getInfo from "../controllers/info.js";
import express from "express";

const router = express.Router();

router.get("/info", getInfo);

export default router;
