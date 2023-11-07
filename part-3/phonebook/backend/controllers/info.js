import fetchAllPersons from "./helpers/persons.js";

const getInfo = (request, response) => {
  const entryCount = fetchAllPersons.then((persons) => persons.length);
  const html = `
    <div>
      <p>Phonebook has info for ${entryCount} people</p>
      <p>${new Date()}</p>
    </div>`;

  response.send(html);
};

export default getInfo;
