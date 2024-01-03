import React from 'react'
import { Search } from '../search'
import styled from '@emotion/styled'
import { Cart, Favorite, Logo, Profile } from '../../shared/assets'
import { Link } from 'react-router-dom'

export const Header = () => {

	return (
		<HeaderWrapper>
			<Logo />
			<Search />
			<HeaderMenu>
				<Link to={'/catalog'}>
					<Cart />
				</Link>
				<Link to={'/profile'}>
					<Profile />
				</Link>
				<Link to={'/favorite'}>
					<Favorite />
				</Link>
			</HeaderMenu>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 45px;
	height: 80px;
	background: #ffe44d;
`

const HeaderMenu = styled.div`
	display: flex;
	gap: 34px;
`
