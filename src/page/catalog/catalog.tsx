import React, { FC, useEffect, useState } from 'react'

import { Sort } from '../../components/sort'
import { Card, SkeletonPage } from '../../components'
import {Divider, Pagination} from '@mui/material'
import styled from '@emotion/styled'
import { withProtection } from '../../HOCs/withProtection'
import { useGetAllProductQuery } from '../../app/api/api'
import { useParams, useSearchParams } from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/store/hooks'
import {nextPage} from "../../app/store/slices/productionsSlice";

export const Catalog
	: FC = withProtection(
	() => {


		const [productionOnPage, setProductionOnPage] = useState<Card[]>([])
		const [searchParams, setSearchParams] = useSearchParams()

		const user = useAppSelector((state) => state.user).user
		const {search, pageActive} = useAppSelector((state) => state.productions)
		const dispatch = useAppDispatch()
		console.log({pageActive})
		const { data: production , isLoading } = useGetAllProductQuery({
			page: pageActive,
			query: search,
			limit: 12,
		});

		useEffect(()=>{
			console.log('update')
			if (production && production.products.length && production.products !== productionOnPage) setProductionOnPage((prev) => prev.concat(production.products))
		},[pageActive])


		useEffect(() => {
			setSearchParams(search ? { query: search } : '')
		}, [search])


		useEffect(() => {
			const observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					console.log('dispatch')
					dispatch(nextPage())
				}
			});

			const list = document.querySelector('#buttom');

			if (list) observer.observe(list!)
		}, [production]);


		if (!productionOnPage || isLoading) return <SkeletonPage />

		return (
			<Wrapper>
				<Sort />
				<CardsWrapper>
					{productionOnPage.map((item) => (
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
				<Divider  id={'buttom'} />
			</Wrapper>
		)
	}
)

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
