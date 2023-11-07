const PersonForm = ({
  onSubmit,
  newPerson: { name, number },
  handleChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        name:
        <input name="name" value={name} onChange={handleChange} />
      </label>
    </div>
    <div>
      <label>
        number:
        <input name="number" value={number} onChange={handleChange} />
      </label>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
