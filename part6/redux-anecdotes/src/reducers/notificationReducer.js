import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        deleteNotification(state, action) {
            return ''
        }
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions

export const setNotification = (text, timeInSeconds) => {
    return dispatch => {
        dispatch(createNotification(text))
        setTimeout(() => 
            dispatch(deleteNotification()), 
            timeInSeconds * 1000)   
    }
}
export default notificationSlice.reducer