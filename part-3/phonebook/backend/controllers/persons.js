import fetchAllPersons from "./helpers/persons.js";
import PersonModel from "../models/person.js";

export const getPersons = (request, response, next) => {
  fetchAllPersons()
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
};

export const getPersonById = (request, response, next) => {
  PersonModel.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
};

export const deletePerson = (request, response, next) => {
  PersonModel.findOneAndDelete(request.params.id)
    .then((person) => {
      if (person) {
        response.status(200).send({
          message: `${person.name} deleted [ID ${person.id}]`,
        });
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

export const addPerson = (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "name or number not provided" });
  }

  PersonModel.findOne({ name })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(400).json({ error: "name must be unique" });
      }

      const newPerson = new PersonModel({ name, number });

      newPerson
        .save()
        .then((savedPerson) => response.status(201).json({ savedPerson }))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

export const updatePerson = (request, response, next) => {
  const updateOperation = { number: request.body.number };
  const returnUpdated = { new: true };

  PersonModel.findOneAndUpdate(
    { _id: request.params.id },
    updateOperation,
    returnUpdated
  )
    .then((person) => {
      if (person) response.status(200).json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
};
