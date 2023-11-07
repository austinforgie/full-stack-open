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

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const updateNumber = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (updateNumber) {
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
          .catch((error) => {
            setNotification({
              message: `Information of ${
                JSON.parse(error.config.data).name
              } has already been removed from the server`,
              type: "error",
            });
          });
      }
    } else {
      service
        .create(newPerson)
        .then((response) => {
          setPersons((prevPersons) => [...prevPersons, response]);

          setNotification({
            message: `Added ${response.name}`,
            type: "success",
          });
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${
              JSON.parse(error.config.data).name
            } has already been removed from the server`,
            type: "error",
          });
        });
    }
  };

  const handlePersonChange = (event) => {
    const { name, value } = event.target;

    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const handleSearchChange = (event) => setSearchTerms(event.target.value);

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerms.toLowerCase())
  );

  const handleRemovePerson = (id) => {
    const target = persons.find((person) => person.id === id);

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
        onSubmit={addPerson}
        newPerson={newPerson}
        handleChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} handleRemovePerson={handleRemovePerson} />
    </div>
  );
};

export default App;
