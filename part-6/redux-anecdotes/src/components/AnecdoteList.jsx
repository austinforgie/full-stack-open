import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    let anecdoteState = state.anecdotes;

    if (state.filter) {
      anecdoteState = state.anecdotes.filter((anecdote) => {
        return anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase());
      });
    }

    return anecdoteState.sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const handleVoteClick = (id) => {
    dispatch(vote(id));
  };

  const anecdoteElements = anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVoteClick(anecdote.id)}>vote</button>
      </div>
    </div>
  ));

  return anecdoteElements;
};

export default AnecdoteList;
