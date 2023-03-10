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
    const anecdotes = useSelector(({ anecdotes, filter }) => {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)


    return (
          <ul>
            {sortedAnecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(vote(anecdote.id))
                }
            />
            )}
          </ul>
    )
}

export default Anecdotes