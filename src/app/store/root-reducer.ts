import { combineReducers } from 'redux'
import { authApi } from '../api/api'
import { authReducer } from './slices/authSlice'
import { userReducer } from './slices/userSlice'
import { productionsReducer } from './slices/productionsSlice'
import { productionReduce } from './slices/productionSlice'

export const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	production: productionReduce,
	productions: productionsReducer,
	[authApi.reducerPath]: authApi.reducer,
})
