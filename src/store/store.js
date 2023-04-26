import { configureStore } from '@reduxjs/toolkit'

import schedulerReducer from "./reducers/schedulerReducer"

const store = configureStore({
    reducer: {
        weeklyScheduler: schedulerReducer
    }
})

export default store
