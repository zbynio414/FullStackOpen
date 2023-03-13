import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { useSelector } from "react-redux";

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state , action) {
      const anecdoteVoted = action.payload 
             
      return state.map(a => 
        a.id !== anecdoteVoted.id ? a : anecdoteVoted)
      },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voting = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdotes = state.anecdotes
    console.log('voting:', anecdotes)
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    const anecdoteVoted = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
    const response = await anecdoteService.update(id, anecdoteVoted)
    dispatch(vote(response))
    
  }
}

export default anecdoteSlice.reducer
