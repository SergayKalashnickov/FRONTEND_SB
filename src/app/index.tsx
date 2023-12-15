import './styles.css'
import { Header, Footer } from '../components'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SingleCard } from '../page/single-card'
import { NotFoundPage } from '../page/not-found-page'
import { Profile } from '../page/profile'
import { FavoritItems } from '../page/favorit-items'
import api from '../api/api'
import { UserContext } from '../context/user-context'
import { Catalog } from '../page/catalog'
import { CardContext } from '../context/card-context'

interface AllCardResponce {
	total: number
	products: Card[]
}

export const App = () => {
	const [search, setSearch] = useState<string>('')
	const [user, setUser] = useState<User | null>(null)
	const [cards, setCards] = useState<AllCardResponce | null>(null)
	const [page, setPage] = useState<number>(1)
	const setSearchValue = () => setSearch('')

	useEffect(() => {
		api.getUserInfo().then((user) => setUser(user))
	}, [])
	useEffect(() => {
		api
			.getAllProducts({ query: search, page, limit: PAGE_SIZE })
			.then((cards) => setCards(cards))
	}, [page])

	const cardContext = cards
		? {
				cards: cards.products,
				setPage,
				page,
				totalPage: cards.total / PAGE_SIZE,
		  }
		: null

	return (
		<Page>
			<UserContext.Provider value={user}>
				<CardContext.Provider value={cardContext}>
					<Header
						onChange={setSearch}
						value={search}
						onReset={setSearchValue}
					/>

					<Routes>
						<Route path={'*'} element={<NotFoundPage />} />
						<Route path='/catalog' element={<Catalog />} />
						<Route path='/singleCard' element={<SingleCard />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/favorite' element={<FavoritItems />} />
					</Routes>
					<Footer />
				</CardContext.Provider>
			</UserContext.Provider>
		</Page>
	)
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;
	min-height: 100%;
`
const PAGE_SIZE = 8
