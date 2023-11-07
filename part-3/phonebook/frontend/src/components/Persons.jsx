const Person = ({ filtered, handleRemovePerson }) => {
  return filtered.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button
        className="person__delete-btn"
        onClick={() => handleRemovePerson(person.id)}
      >
        delete
      </button>
    </p>
  ));
};

export default Person;
