import deepFreeze from "deep-freeze"
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
    const initialState = [
        {
            content: 'test anecdote',
            id: 1,
            votes: 0
        }
    ]

    test('voting action increase number', ()=> {
      const action = {
        type: 'vote',
        payload: {id: 1}
      } 
      const state = initialState
      deepFreeze(state)
      const newState = anecdoteReducer(state, action)
      expect(newState[0]).toEqual({
        content: 'test anecdote',
        id: 1,
        votes: 1
      })
    })
})