import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDebounce } from '../../shared/utils/debounce'
import { setSearch } from '../../app/store/slices/productionsSlice'
import { useAppDispatch } from '../../app/store/hooks'


export const Search = () => {
	const [values, setValues] = useState<string>('')
	const dispatch = useAppDispatch()

	const debouncedValue = useDebounce<string>(values, 300)

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues(e.target.value)
	}

	useEffect(() => {
		dispatch(setSearch(debouncedValue))
	}, [debouncedValue])

	return (
		<>
			<SearchStyled value={values} onChange={handlerChange} />
			<ButtonReset onClick={() => setValues('')}>x</ButtonReset>
		</>
	)
}

const SearchStyled = styled.input`
	width: 468px;
	height: 48px;
	padding: 0 50px 0 20px;
	border-radius: 24px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const ButtonReset = styled.button`
	border: 0 solid;
	width: 20px;
	height: 20px;
	background-color: white;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	left: -90px;
`
