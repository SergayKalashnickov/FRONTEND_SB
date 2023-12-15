import { useLocation, useParams } from 'react-router-dom'
import { Button, Divider, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { getProductById } from '../../services/production/productionSlice'
import { useEffect } from 'react'

export const SingleCard = () => {
	const { itemId } = useParams()
	const location = useLocation()

	const dispatch = useAppDispatch()
	const production = useAppSelector((state) => state.production).production


	useEffect(() => {
		if (itemId != null) {
			dispatch(getProductById(itemId))
		}
	}, [])

	if (!production) return null

	return (
		<Overlay>
			<Button href={location.state ? location.state.pathname : '/catalog'}>
				Back
			</Button>
			<Typography variant='h1'></Typography>
			<Typography>{production.name}</Typography>
			<Typography bgcolor={'red'}>-{production.stock}%</Typography>
			<ImgWrapper src={production.pictures} alt='pictures' />
			<Typography variant='h1'></Typography>
			<Typography variant='h2'>Описание</Typography>
			<Typography>{production.description}</Typography>
			<Typography variant='h2'>Характеристики</Typography>
			<div>
				<Typography>Вес:{production.wight} </Typography>
				<Typography>Цена:{production.price} </Typography>
			</div>
			<Typography variant='h2'>Отзывы</Typography>
			<Button>Написать отзыв</Button>
			{production.reviews.map((review) => (
				<div key={production._id}>
					<Typography variant='h2'>{review.author.name}</Typography>
					<Typography>{review.created_at}</Typography>
					<Typography>{review.city}</Typography>
					<Typography>{review.text}</Typography>
					<Divider />
				</div>
			))}
		</Overlay>
	)
}

const Overlay = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-left: 300px;
`

const ImgWrapper = styled.img`
	width: 400px;
	height: 400px;
`
