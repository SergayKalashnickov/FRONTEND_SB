import React, { FC, useEffect, useState } from 'react'

import { Sort } from '../../components/sort'
import { Card, SkeletonPage } from '../../components'
import { Pagination } from '@mui/material'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { fetchProductions } from '../../app/store/slices/productionsSlice'
import { withProtection } from '../../HOCs/withProtection'
import { useGetAllProductQuery } from '../../app/api/api'

export const Catalog: FC = withProtection(() => {
	const [page, setPage] = useState<number>(1)

	const { data: product, isLoading } = useGetAllProductQuery({})
	const user = useAppSelector((state) => state.user).user

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProductions({ page }))
	}, [page])

	if (!product || isLoading) return <SkeletonPage />

	const { products, total } = product

	return (
		<Wrapper>
			<Sort />
			<CardsWrapper>
				{products.map((item) => (
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
			</CardsWrapper>
			<Pagination
				count={total}
				size='small'
				page={page}
				onChange={(e, page) => setPage(page)}
			/>
		</Wrapper>
	)
})

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
