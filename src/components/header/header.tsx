import React from 'react'
import { Search } from '../search'
import styled from '@emotion/styled'
import { Cart, Favorite, Logo, Profile } from '../../shared/assets'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'

export const Header = () => {
	const basket = useAppSelector((state) => state.user).basket

	return (
		<HeaderWrapper>
			<Link to={'/catalog'}>
				<Logo />
			</Link>
			<Search />
			<HeaderMenu>
				<Link to={'/basket'}>
					<Cart />
					<BacketBubble>{basket && basket.length}</BacketBubble>
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

const BacketBubble = styled.div`
	border-radius: 5px;
	padding-left: 3px;
	padding-right: 3px;
	position: fixed;
	background: red;
	font-size: x-small;
	top: 20px;
	color: white;
`
