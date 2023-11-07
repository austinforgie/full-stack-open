import {
  getPersons,
  getPersonById,
  deletePerson,
  addPerson,
  updatePerson,
} from "../controllers/persons.js";
import express from "express";

const router = express.Router();

router.get("/persons", getPersons);
router.get("/persons/:id", getPersonById);

router.delete("/persons/:id", deletePerson);
router.post("/persons", addPerson);
router.put("/persons/:id", updatePerson);

export default router;
