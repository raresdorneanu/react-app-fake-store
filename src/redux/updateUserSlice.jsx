import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {
        email: '',
        name: '',
        avatar: '',
        errorMessage: ''
    },
    reducers: {
        setField: (state, action) => {
            state[action.payload.field] = action.payload.value
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    }
})

export const { setField, setErrorMessage } = updateUserSlice.actions;
export default updateUserSlice.reducer;