import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch({ type: "anecdote/create", payload: { anecdote } });
    dispatch({
      type: "notification/show",
      payload: { message: `you created '${anecdote}'` },
    });

    setTimeout(() => {
      dispatch({ type: "notification/clear" });
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
