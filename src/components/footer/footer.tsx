import React from 'react'
import styled from '@emotion/styled'
import { Logo } from '../../shared/assets'

export const Footer = () => {
	return (
		<FooterStyle>
			<Manu>
				<Logo />
				<p>© «Интернет-магазин DogFood.ru»</p>
			</Manu>
			<Manu>
				<p>Каталог</p>
				<p>Акции</p>
				<p>Новости</p>
				<p>Отзывы</p>
			</Manu>
			<Manu>
				<p>Оплата и доставка</p>
				<p>Часто спрашивают</p>
				<p>Обратная связь</p>
				<p>Контакты</p>
			</Manu>
			<Manu>
				<h4>Мы на связи</h4>
				<Conntacts>
					<h4>8 (999) 00-00-00</h4>
					<p>dogfood.ru@gmail.com</p>
				</Conntacts>
				<p />
			</Manu>
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

const Manu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 114px;
`

const Conntacts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`
