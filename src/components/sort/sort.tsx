import React from 'react'
import styled from '@emotion/styled'

export const Sort = () => {
	const mockSortVaribale = [
		'Популярные',
		'Новинки',
		'Сначала дешёвые',
		'Сначала дорогие',
		'По рейтингу',
		'По скидке',
	]
	return (
		<SortLayout>
			{mockSortVaribale.map((item) => (
				<p key={item}>{item}</p>
			))}
		</SortLayout>
	)
}

const SortLayout = styled.div`
	display: flex;
	box-shadow: 0px 5px 5px rgba(96, 97, 112, 0.16);
	padding-left: 16px;
	height: 44px;
	border-radius: 12px;
	align-items: center;
	gap: 16px;
`
