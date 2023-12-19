export {}
declare global {
	interface User {
		name: string
		about: string
		avatar: string
		id: string
		email: string
		__v?: number
		group?: string
	}

	interface FetchAllProduct {
		total: number
		products: Card[]
	}

	interface fetchProductionsPayload {
		query?: string
		page?: number
		limit?: number
	}

	interface Card {
		author: User
		name: string
		price: number
		discount: number
		stock: number
		available: boolean
		wight: string
		description: string
		pictures: string
		tags: string[]
		likes: string[]
		reviews: Review[]
		_id: string
	}

	interface Review {
		name: string
		city: string
		text: string
		rating: number
		author: {
			name: string
			about: string
			avatar: string
			email: string
			password: string
			isAdmin: boolean
			group: string
		}
		product: string
		_id: string
		updated_at: string
		created_at: string
	}

	interface Tokens {
		accessToken: string
		refreshToken: string
	}
}
