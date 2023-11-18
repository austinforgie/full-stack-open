import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch({
      type: "filter/update",
      payload: { query: event.target.value },
    });
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
