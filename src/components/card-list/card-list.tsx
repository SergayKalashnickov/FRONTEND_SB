import React, { useState } from 'react'
import { cards } from '../../api/mock/mock'
import { Card } from '../card'
import styled from '@emotion/styled'
import { Pagination } from '@mui/material'
import { Sort } from '../sort'

interface CardListProps {
	search: string
}

export const CardList = (props: CardListProps) => {
	const { search } = props

	const [page, setPage] = useState<number>(1)
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const cardWithSearch = cards.filter((item) =>
		item.name.toLowerCase().includes(search)
	)

	const paginationCard = cardWithSearch.filter(
		(item, index) => index >= (page - 1) * PAGE_SIZE && index < page * PAGE_SIZE
	)

	return (
		<Wrapper>
			<Sort />
			<CardsWrapper>
				{paginationCard.map((item) => (
					<Card
						key={item._id}
						pictures={item.pictures}
						discount={item.discount}
						price={item.price}
						name={item.name}
						wight={item.wight}
					/>
				))}
			</CardsWrapper>
			<Pagination
				count={cardWithSearch.length / PAGE_SIZE}
				size='small'
				page={page}
				onChange={handleChange}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-content: space-around;
	flex-wrap: wrap;
	flex-direction: column;
	padding-bottom: 20px;
	gap: 20px;
`

const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`

const PAGE_SIZE = 8
