import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
export const createNew = async (newContent) => {
    const newAnecdote = {
        content: newContent, votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

export const update = async (updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
}
// export default { getAll, createNew, update }