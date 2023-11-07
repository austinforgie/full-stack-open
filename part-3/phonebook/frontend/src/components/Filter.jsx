const Filter = ({ value, onChange }) => (
  <div>
    <label>
      filter shown with <input value={value} onChange={onChange} />
    </label>
  </div>
);

export default Filter;
