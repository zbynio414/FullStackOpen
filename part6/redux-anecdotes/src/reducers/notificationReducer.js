import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'initial value',
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
export default notificationSlice.reducer