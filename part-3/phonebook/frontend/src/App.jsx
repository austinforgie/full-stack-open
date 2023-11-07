import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import service from "./services/service";
import Notification from "./components/Notification";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerms, setSearchTerms] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    service.getAll().then((data) => setPersons(data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [notification]);

  const updatePerson = (existingPerson) => {
    service
      .update(existingPerson.id, newPerson)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? response : person
          )
        );

        setNotification({
          message: `Updated ${response.name}`,
          type: "success",
        });
      })
      .catch(() => {
        setNotification({
          message: "Error with updating person",
          type: "error",
        });
      });
  };

  const addPerson = (person) => {
    service
      .create(person)
      .then(({ savedPerson: { name, id, number } }) => {
        setPersons((prevPersons) => [...prevPersons, { name, id, number }]);

        setNotification({
          message: `Added ${name}`,
          type: "success",
        });
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
      });
  };

  const isValidPerson = ({ name, number }) => {
    if (!name || !number) {
      setNotification({
        message: "Name or number not provided",
        type: "error",
      });

      return false;
    }

    return true;
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!isValidPerson(newPerson)) return;

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const updateNumber = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (updateNumber) updatePerson(existingPerson);
    } else addPerson(newPerson);
  };

  const handlePersonChange = (event) => {
    const { name, value } = event.target;

    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const handleSearchChange = (event) => setSearchTerms(event.target.value);

  const filtered = searchTerms
    ? persons.filter(
        (person) =>
          person &&
          person.name.toLowerCase().includes(searchTerms.toLowerCase())
      )
    : persons;

  const handleRemovePerson = (id) => {
    const target = persons.find((person) => person.id === id);

    // eslint-disable-next-line no-unused-vars
    service.remove(id).then((_) => {
      setPersons((prevPersons) =>
        prevPersons.filter((person) => person.id !== id)
      );

      setNotification({
        message: `Deleted ${target.name}`,
        type: "success",
      });
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={searchTerms} onChange={handleSearchChange} />
      <PersonForm
        onSubmit={handleAddPerson}
        newPerson={newPerson}
        handleChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} handleRemovePerson={handleRemovePerson} />
    </div>
  );
};

export default App;
