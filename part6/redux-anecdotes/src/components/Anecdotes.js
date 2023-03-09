import { useDispatch, useSelector } from "react-redux";
import { vote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
          </div>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    return (
        <div>
          <h2>Anecdotes</h2>
          <ul>
            {anecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(vote(anecdote.id))
                }
            />
            )}
          </ul>
        </div>
    )
}

export default Anecdotes