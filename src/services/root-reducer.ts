import { combineReducers } from 'redux'
import { userReducer } from './user/userSlice'
import { productionReduce } from './production/productionSlice'
import { productionsReducer } from './production/productionsSlice'

export const rootReducer = combineReducers({
	user: userReducer,
	production: productionReduce,
	productions: productionsReducer,
})
