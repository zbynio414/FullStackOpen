import deepFreeze from "deep-freeze"
import anecdoteReducer from './anecdoteReducer'

describe('anecdoreReducer', () => {
    const initialState = [
        {
            content: 'test anecdote',
            id: 1,
            votes: 0
        }
    ]

    test('voting action increase number', ()=> {
      const action = {
        type: 'vote'
      } 
      const state = initialState
      deepFreeze(state)
      const newState = anecdoteReducer(state, action)
      expect(newState).toContain({
        content: 'test anecdote',
        id: 1,
        votes: 1
      })
    })
})