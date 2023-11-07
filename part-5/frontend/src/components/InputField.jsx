import PropTypes from "prop-types";

const InputField = ({ type = "text", label, value, onChange }) => (
  <div>
    <label>
      {label}
      <input
        type={type}
        value={value}
        name={label}
        required
        onChange={({ target: { value } }) => onChange(value)}
      />
    </label>
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
