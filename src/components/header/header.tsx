import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
// import Logo from '../../shared/assets/icon/logo.svg'
// import Cart from '../../shared/assets/icon/cart.svg'
// import Profile from '../../shared/assets/icon/profile.svg'
// import Favorite from '../../shared/assets/icon/favorite.svg'
import { Search } from '../search'
import { useAppSelector } from '../../app/store/hooks'
import { Cart, Favorite, Logo, Profile } from '../../shared/assets'

export const Header = () => {
	const basket = useAppSelector((state) => state.user).basket

	return (
		<HeaderWrapper>
			<Link data-testid={'link-catalog'} to={'/catalog'}>
				<Logo />
			</Link>
			<Search />
			<HeaderMenu>
				<Link data-testid={'link-card'} to={'/basket'}>
					<Cart />
					<BacketBubble>{basket && basket.length}</BacketBubble>
				</Link>
				<Link data-testid={'link-profile'} to={'/profile'}>
					<Profile />
				</Link>
				<Link data-testid={'link-favorite'} to={'/favorite'}>
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

const BacketBubble = styled.div`
	border-radius: 5px;
	padding-left: 3px;
	padding-right: 3px;
	position: absolute;
	background: red;
	font-size: x-small;
	top: 20px;
	color: white;
`
