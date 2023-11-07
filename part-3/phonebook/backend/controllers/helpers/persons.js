import PersonModel from "../../models/person.js";

const fetchAllPersons = () => PersonModel.find({});

export default fetchAllPersons;
