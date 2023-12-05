import React from 'react'
import styled from '@emotion/styled'
import { css, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

interface CardProps {
	pictures: string
	available?: boolean
	discount: number
	stock?: number
	price: number
	wight?: string
	name: string
	like: boolean
	id: string
}

export const Card = (props: CardProps) => {
	const { pictures, discount, price, name, wight, like, id } = props

	const location = useLocation()
	console.log(id)

	return (
		<Wrapper>
			<Link to={`/singleCard/${id}`} state={location}>
				<Picture src={pictures} alt={props.name} />
			</Link>
			{discount > 0 && <OldPrice>{price} ₽</OldPrice>}
			<Price discount={!!discount}>
				{Math.round(discount ? price - (discount / 100) * price : price)} ₽
			</Price>
			<Typography variant='overline'>{wight}</Typography>
			<Link to={`/singleCard/${id}`} state={location}>
				<text>{name}</text>
			</Link>
			<div>{like && 'Like'}</div>
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
