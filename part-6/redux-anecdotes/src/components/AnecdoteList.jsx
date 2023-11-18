import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) => {
        return anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase());
      });
    }

    return state.anecdotes;
  });

  const dispatch = useDispatch();

  const handleVoteClick = (id, content) => {
    dispatch({ type: "anecdote/incrementVotes", payload: { id } });
    dispatch({
      type: "notification/show",
      payload: { message: `you voted '${content}'` },
    });

    setTimeout(() => {
      dispatch({ type: "notification/clear" });
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const anecdoteElements = sortedAnecdotes.map(({ id, content, votes }) => (
    <div key={id}>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => handleVoteClick(id, content)}>vote</button>
      </div>
    </div>
  ));

  return anecdoteElements;
};

export default AnecdoteList;
