export const config = {
	apiUrl: 'https://api.react-learning.ru/v2/group-12',
	apiToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY3NGY2M2FmMjA3YTRlZGJmZGRlYjYiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNzAxMjY5NDE4LCJleHAiOjE3MzI4MDU0MTh9.FoShIw_ln8i1oU46ko5jI6lsURmZ_vqMOTIWPqfLqqg',
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

	getAllProducts(payload: {
		query?: string
		page?: number
		limit?: number
	}): Promise<FetchAllProduct> {
		return fetch(
			this.getApiUrl(
				`/products?query=${payload.query}&page=${payload.page}&limit=${payload.limit}`
			),
			{
				headers: this.headers,
			}
		).then(this.onResponse)
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
		authorization: `Bearer ${config.apiToken}`,
	},
})
export default api
