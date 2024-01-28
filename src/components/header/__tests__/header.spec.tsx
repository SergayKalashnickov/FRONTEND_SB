import '@testing-library/jest-dom'
import React from 'react'
import { getByTestId } from '@testing-library/react'
import { Header } from '../header'
import { renderWithProvider } from '../../../shared/utils/renderWithProvider'

describe('Тестируем компонент Header', () => {
	it('should render card link', async () => {
		const { container } = renderWithProvider(<Header />)
		expect(getByTestId(container, 'link-card')).toBeInTheDocument()
	})

	it('should render catalog link', async () => {
		const { container } = renderWithProvider(<Header />)
		expect(getByTestId(container, 'link-catalog')).toBeInTheDocument()
	})

	it('should render favorite link', async () => {
		const { container } = renderWithProvider(<Header />)
		expect(getByTestId(container, 'link-favorite')).toBeInTheDocument()
	})

	it('should render profile link', async () => {
		const { container } = renderWithProvider(<Header />)
		expect(getByTestId(container, 'link-profile')).toBeInTheDocument()
	})
})
