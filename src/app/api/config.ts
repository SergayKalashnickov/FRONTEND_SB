import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { RootState } from '../store/types'

export const customBaseQuery = fetchBaseQuery({
	baseUrl: 'https://api.react-learning.ru/v2/group-12/',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken

		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`)
		}
		return headers
	},
})
