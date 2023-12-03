import { configureStore } from "@reduxjs/toolkit"
import tableSlice from './tableSlice'

const store = configureStore({
    reducer:{
        table : tableSlice
    }
})

export default store;