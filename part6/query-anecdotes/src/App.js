import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll, update } from './services/anecdotes'
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({type: 'create', payload: `You have voted: '${anecdote.content}'`})
    setTimeout(() => {
      dispatchNotification({type: 'delete'})
    }, 5000);
  }

  const { 
    isLoading,
    isError,
    error,
    data: anecdotes
  } = useQuery('anecdotes',
      getAll
  )

  let content 
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>{error.message}</p>
  } else {
    content = anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )
  }

  return (
    <div>
      <h3>Anecdote with React Query app</h3>
    
      <Notification />
      <AnecdoteForm />
      {content}
    </div>
  )
}

export default App
