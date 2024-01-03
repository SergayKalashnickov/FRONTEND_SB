import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './config'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from '../store/types'
import { store } from '../store/store'

export const config = {
	apiUrl: 'https://api.react-learning.ru/v2/group-12',
}

type TConfigApi = {
	baseUrl: string
	headers: HeadersInit
}
export type UserBodyDto = {
	about: string
	name: string
	avatar: string
}
type ServerResponse<T> = {
	created_at?: Date
	updated_at?: Date
	__v: number
} & T
export type TUserResponseDto = ServerResponse<User>
export type TCommentResponseDto = ServerResponse<Comment>

type BE_SignUpResponse = Omit<User, 'id'> & {
	_id: User['id']
}

interface BE_SignInResponse {
	data: BE_SignUpResponse
	token: Tokens['accessToken']
}

type SignInResponse = {
	data: User
	token: Tokens['accessToken']
}

interface SignInFormValues {
	email: string
	password: string
}

interface SignUpFormValues {
	email: string
	group: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['User'],
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<BE_SignUpResponse, SignUpFormValues>({
			query: (signUpFormValues) => ({
				url: 'signup',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (signInFormValues) => ({
				url: 'signin',
				method: 'POST',
				body: signInFormValues,
			}),
			transformResponse: (response: BE_SignInResponse) => {
				const {
					data: { _id, ...restData },
					...restResponse
				} = response
				return {
					data: {
						id: _id,
						...restData,
					},
					...restResponse,
				}
			},
		}),
		getAllProduct: builder.query<FetchAllProduct, fetchProductionsPayload>({
			query: (payload) => ({
				url: `/products?query=${payload.query}&page=${payload.page}&limit=${payload.limit}`,
				method: 'GET',
			}),
		}),
	}),
})

export const { useSignUpMutation, useSignInMutation, useGetAllProductQuery } =
	authApi

export class Api {
	private baseUrl
	private headers
	constructor({ baseUrl, headers }: TConfigApi) {
		this.baseUrl = baseUrl
		this.headers = headers
	}
	private onResponse(res: Response) {
		return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
	}
	private getApiUrl(path: string) {
		return `${this.baseUrl}${path}`
	}

	getUserInfo(): Promise<User> {
		return fetch(this.getApiUrl('/users/me'), {
			headers: this.headers,
		}).then(this.onResponse)
	}

	setUserInfo(userData: Pick<User, 'name' | 'about'>): Promise<User> {
		return fetch(this.getApiUrl('/users/me'), {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(userData),
		}).then(this.onResponse)
	}

	getUsers() {
		return fetch(this.getApiUrl('/users'), {
			headers: this.headers,
		}).then(this.onResponse)
	}
	changeUserAvatar(data: Pick<User, 'avatar'>) {
		return fetch(this.getApiUrl('/users/me/avatar'), {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(data),
		}).then(this.onResponse)
	}
	getProductById(productId: string) {
		return fetch(this.getApiUrl(`/products/${productId}`), {
			headers: this.headers,
		}).then(this.onResponse)
	}

	deleteProduction(payload: { productId: string }) {
		return fetch(this.getApiUrl(`/products/${payload.productId}`), {
			method: 'DELETE',
			headers: this.headers,
		}).then(this.onResponse)
	}

	addLikes(payload: { productId: string }) {
		return fetch(this.getApiUrl(`/products/likes/${payload.productId}`), {
			method: 'PUT',
			headers: this.headers,
		}).then(this.onResponse)
	}

	deleteLikes(payload: { productId: string }) {
		return fetch(this.getApiUrl(`/products/likes/${payload.productId}`), {
			method: 'DELETE',
			headers: this.headers,
		}).then(this.onResponse)
	}
}
const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${store.getState().auth.accessToken}`,
	},
})
export default api
