import React from 'react'
import { Search } from '../search'
import styled from '@emotion/styled'
import { Cart, Favorite, Logo, Profile } from '../../shared/assets'
import { Link } from 'react-router-dom'

interface headerProps {
	onChange: (e: string) => void
	value: string
	onReset: () => void
}

export const Header = (props: headerProps) => {
	const { onChange, onReset, value } = props
	return (
		<HeaderWrapper>
			<Logo />
			<Search onChange={onChange} onReset={onReset} value={value} />
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
