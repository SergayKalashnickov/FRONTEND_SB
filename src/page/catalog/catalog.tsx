import React, { useContext } from 'react'

import { Sort } from '../../components/sort'
import { Card, SkeletonPage } from '../../components'
import { Pagination } from '@mui/material'
import styled from '@emotion/styled'
import { CardContext } from '../../context/card-context'
import { UserContext } from '../../context/user-context'

export const Catalog = () => {
	const cardContext = useContext(CardContext)

	const user = useContext(UserContext)

	if (!cardContext) return <SkeletonPage />

	const { cards, page, setPage, totalPage } = cardContext

	if (!cards) return <SkeletonPage />

	return (
		<Wrapper>
			<Sort />
			<CardsWrapper>
				{cards.map((item) => (
					<Card
						key={item._id}
						pictures={item.pictures}
						discount={item.discount}
						price={item.price}
						name={item.name}
						wight={item.wight}
						like={user ? item.likes.includes(user._id) : false}
					/>
				))}
			</CardsWrapper>
			<Pagination
				count={totalPage}
				size='small'
				page={page}
				onChange={(e, page) => setPage(page)}
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
