import React, { useEffect, useState } from 'react'

import { Sort } from '../../components/sort'
import { Card, SkeletonPage } from '../../components'
import { Pagination } from '@mui/material'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { fetchProductions } from '../../services/production/productionsSlice'

export const Catalog = () => {
	const [page, setPage] = useState<number>(1)

	const user = useAppSelector((state) => state.user).user
	const product = useAppSelector((state) => state.productions)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProductions({ page }))
	}, [page])

	if (!product) return <SkeletonPage />

	const { productions, totalPage } = product

	if (!productions) return <SkeletonPage />

	return (
		<Wrapper>
			<Sort />
			<CardsWrapper>
				{productions.map((item) => (
					<Card
						key={item._id}
						id={item._id}
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
