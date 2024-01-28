import React from 'react'
import styled from '@emotion/styled'
import { Logo } from '../../shared/assets'
// import Logo from '../../shared/assets/icon/logo.svg'

export const Footer = () => {
	return (
		<FooterStyle>
			<Menu>
				<Logo />
				<p>© «Интернет-магазин DogFood.ru»</p>
			</Menu>
			<Menu>
				<p>Каталог</p>
				<p>Акции</p>
				<p>Новости</p>
				<p>Отзывы</p>
			</Menu>
			<Menu>
				<p>Оплата и доставка</p>
				<p>Часто спрашивают</p>
				<p>Обратная связь</p>
				<p>Контакты</p>
			</Menu>
			<Menu>
				<h4>Мы на связи</h4>
				<Contacts>
					<h4>8 (999) 00-00-00</h4>
					<p>dogfood.ru@gmail.com</p>
				</Contacts>
				<p />
			</Menu>
		</FooterStyle>
	)
}

const FooterStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 100px;
	height: 194px;
	width: 100%;
	background-color: rgba(255, 228, 77, 1);
`

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 114px;
`

const Contacts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`
