import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const customBaseQuery = fetchBaseQuery({
	baseUrl: 'https://api.react-learning.ru/v2/group-12/',
	prepareHeaders: (headers) => {
		const accessToken = localStorage.getItem('Token')

		if (accessToken) {
			headers.set('authorization', `Bearer ${localStorage.getItem('Token')}`)
		}
		return headers
	},
})
