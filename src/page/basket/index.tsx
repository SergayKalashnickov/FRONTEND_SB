import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Divider, Typography } from '@mui/material'
import { DeleteIcon } from '../../shared/assets'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import {
	useGetAllProductQuery,
	useGetProductByIdQuery,
} from '../../app/api/api'
import { Card, SkeletonPage } from '../../components'
import { addProductBasket } from '../../app/store/slices/userSlice'

export const Basker = () => {
	const basket = useAppSelector((state) => state.user).basket
	const user = useAppSelector((state) => state.user).user

	const [page, setPage] = useState<number>(1)
	const { data: production } = useGetAllProductQuery({
		page: page,
		query: '',
		limit: 6,
	})

	if (!production) return null

	return (
		<PageWrapper>
			<>{basket ? `Товаров в корзине ${basket.length}` : ''}</>
			{basket
				? basket.map((item) => (
						<BasketCard id={item.id} counter={item.counter}></BasketCard>
				  ))
				: null}

			<OrderInfo></OrderInfo>
			<Catalog>
				<>
					<CardWrapper>
						<Typography>С этим товаром заказывают</Typography>
						<Button
							onClick={() =>
								setPage((prevState) =>
									prevState > 1 ? prevState - 1 : prevState
								)
							}
						>
							-
						</Button>
						<Button onClick={() => setPage((prevState) => prevState + 1)}>
							+
						</Button>
					</CardWrapper>
				</>
				<CardWrapper>
					{production.products.map((item) => (
						<Card
							key={item._id}
							id={item._id}
							pictures={item.pictures}
							discount={item.discount}
							price={item.price}
							name={item.name}
							wight={item.wight}
							like={user ? item.likes.includes(user.id) : false}
						/>
					))}
				</CardWrapper>
			</Catalog>
		</PageWrapper>
	)
}

const PageWrapper = styled('div')`
	display: flex;
	flex-direction: column;
`
const OrderInfo = () => {
	return (
		<div>
			<p>Ваша корзина</p>
			<Button>Заказать</Button>
		</div>
	)
}

interface BasketCard {
	counter: number
	id: string
}
const BasketCard = (props: BasketCard) => {
	const { id, counter } = props
	const { data } = useGetProductByIdQuery({
		id,
	})
	const dispatch = useAppDispatch()
	const counterUp = () => dispatch(addProductBasket({ id, counter: 1 }))
	const counterDown = () => dispatch(addProductBasket({ id, counter: -1 }))

	if (!data) return null

	const { name, description, stock, price } = data

	return (
		<div>
			<div>
				<Typography>{name}</Typography>
				<Typography>{description}</Typography>
			</div>
			<Counter>
				<Button onClick={counterUp}>+</Button>
				{counter}
				<Button onClick={counterDown}>-</Button>
			</Counter>
			<div>
				{stock && <Typography>{price}</Typography>}
				<Typography color={stock ? 'red' : 'black'}>{price}</Typography>
			</div>
			<DeleteIcon />
			<Divider></Divider>
		</div>
	)
}

const Counter = styled.div`
	border: gray 1px solid;
	border-radius: 5px;
`

const Catalog = styled.div`
	display: flex;
	flex-direction: column;
`
const CardWrapper = styled.div`
	display: flex;
	flex-direction: row;
`
