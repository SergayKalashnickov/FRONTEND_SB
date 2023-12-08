import React, { ChangeEvent } from 'react'
import styled from '@emotion/styled'

export interface SearchProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	onChange: (e: string) => void
	value: string
	onReset: () => void
}

export const Search = (props: SearchProps) => {
	const { onReset, onChange, value } = props

	const handlerReset = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<>
			<SearchStyled value={value} onChange={handlerReset} />
			<ButtonReset onClick={onReset}>x</ButtonReset>
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
