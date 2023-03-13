import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const NewAnecdote = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(NewAnecdote))
    dispatch(createNotification(`You have created '${NewAnecdote}'`))
    setTimeout(() => dispatch(deleteNotification()), 5000)

  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
                <input  name='anecdote' />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default NewAnecdote