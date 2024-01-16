import './styles.css'
import { Header, Footer } from '../components'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SingleCard } from '../page/single-card'
import { NotFoundPage } from '../page/not-found-page'
import { Profile, ProfileEdit } from '../page/profile'
import { FavoritItems } from '../page/favorit-items'
import { Catalog } from '../page/catalog'
import { Provider } from 'react-redux'
import { SingInForm } from '../page/signin'
import { store } from './store/store'
import { SignUpForm } from '../page/signup'

export const App = () => {
	const [search, setSearch] = useState<string>('')
	const setSearchValue = () => setSearch('')

	return (
		<Page>
			<Provider store={store}>
				<Header onChange={setSearch} value={search} onReset={setSearchValue} />
				<Routes>
					<Route path={'*'} element={<NotFoundPage />} />
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/singleCard/:itemId' element={<SingleCard />} />
					<Route path='/profile-edit' element={<ProfileEdit />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/favorite' element={<FavoritItems />} />
					<Route path='/signin' element={<SingInForm />} />
					<Route path='/singup' element={<SignUpForm />} />
				</Routes>
				<Footer />
			</Provider>
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
