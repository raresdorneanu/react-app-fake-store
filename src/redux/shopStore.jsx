import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './shopSlice'
import updateUserReducer from './updateUserSlice'

const shopStore = configureStore({
    reducer: {
        shop: shopReducer,
        updateUser: updateUserReducer
    }
})

export default shopStore;