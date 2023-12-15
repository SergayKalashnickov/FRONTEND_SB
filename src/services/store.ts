import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import api from '../api/api'

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
			serializableCheck: false,
		}),
})
