import React from 'react'
import styled from '@emotion/styled'
import { css, Typography } from '@mui/material'

interface CardProps {
	pictures: string
	available?: boolean
	discount: number
	stock?: number
	price: number
	wight?: string
	name: string
}

export const Card = (props: CardProps) => {
	const { pictures, discount, price, name, wight } = props
	return (
		<Wrapper>
			<Picture src={pictures} alt={props.name} />
			{discount > 0 && <OldPrice>{price} ₽</OldPrice>}
			<Price discount={!!discount}>
				{Math.round(discount ? price - (discount / 100) * price : price)} ₽
			</Price>
			<Typography variant='overline'>{wight}</Typography>
			<text>{name}</text>
			<ButtonCard>В корзину</ButtonCard>
		</Wrapper>
	)
}

const OldPrice = styled(Typography)`
	text-decoration: line-through;
`

interface PricePayload {
	discount: boolean
}

const Price = styled(Typography)<PricePayload>(
	({ discount }) => css`
		color: ${discount ? 'red' : 'black'};
	`
)

const Picture = styled.img`
	width: 236px;
	height: 187px;
`

const Wrapper = styled.div`
	width: 236px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 10px;
`
const ButtonCard = styled.button`
	width: 121px;
	height: 40px;
	border-radius: 55px;
	border: 0 solid;
	background-color: #ffe44d;
	&:hover {
		background-color: RED;
	}
`
