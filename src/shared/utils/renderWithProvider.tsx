import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../app/store/store'

export const renderWithProvider = (children: JSX.Element) => {
	return render(
		<BrowserRouter>
			<Provider store={store}>{children}</Provider>
		</BrowserRouter>
	)
}
