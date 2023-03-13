import { useDispatch, useSelector } from "react-redux";
import { vote } from '../reducers/anecdoteReducer';
import { createNotification, deleteNotification } from "../reducers/notificationReducer";

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
                handleVote={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(createNotification(`You voted '${anecdote.content}'`))
                  setTimeout(() => dispatch(deleteNotification('')), 5000)
                }}
            />
            )}
          </ul>
    )
}

export default Anecdotes