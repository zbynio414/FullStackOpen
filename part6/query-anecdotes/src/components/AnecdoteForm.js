import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../services/anecdotes'
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content, {
      onSuccess: (response) => dispatchNotification({type: 'create', payload: `you have created new anecdote: '${response.content}'`}),
      onError: () => dispatchNotification({type: 'create', payload: 'too short anecdote, must have length 5 or more'})
    })
    setTimeout(() => {
      dispatchNotification({type: 'delete'})
    }, 5000)   
  }   

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
