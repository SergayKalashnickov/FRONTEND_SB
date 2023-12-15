import { createContext } from 'react'

interface ICardContext {
	cards?: Card[]
	setPage: (value: ((prevState: number) => number) | number) => void | null
	page: number
	totalPage?: number
}
export const CardContext = createContext<ICardContext | null>(null)

CardContext.displayName = 'CardContext'
