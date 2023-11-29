export {}
declare global {
	interface User {
		name: string
		about: string
		avatar: string
		_id: string
		email: string
		__v?: number
		group?: string
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
		reviews: string[]
		_id: string
	}
}
