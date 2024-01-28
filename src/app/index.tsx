import './styles.css'
import { Footer, Header } from '../components'
import styled from '@emotion/styled'
import { Route, Routes } from 'react-router-dom'
import { SingleCard } from '../page/single-card'
import { NotFoundPage } from '../page/not-found-page'
import { Profile, ProfileEdit } from '../page/profile'
import { FavoriteItems } from '../page/favorit-items'
import { Catalog } from '../page/catalog'
import { Provider } from 'react-redux'
import { SingInForm } from '../page/signin'
import { store } from './store/store'
import { SignUpForm } from '../page/signup'
import { Backer } from '../page/basket'

export const App = () => {
	return (
		<Page>
			<Provider store={store}>
				<Header />
				<Routes>
					<Route path={'*'} element={<NotFoundPage />} />
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/singleCard/:itemId' element={<SingleCard />} />
					<Route path='/profile-edit' element={<ProfileEdit />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/favorite' element={<FavoriteItems />} />
					<Route path='/signIn' element={<SingInForm />} />
					<Route path='/signUp' element={<SignUpForm />} />
					<Route path='/basket' element={<Backer />} />
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
