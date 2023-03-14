import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll, update } from './services/anecdotes'
// import axios from "axios";

const App = () => {
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const { 
    isLoading,
    isError,
    error,
    data: anecdotes
  } = useQuery('anecdotes',
      getAll
    // () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
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
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {content}
    </div>
  )
}

export default App
