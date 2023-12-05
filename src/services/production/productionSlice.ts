// . Создать срез детальной карточки товара. Создать асинхронные экшены:
// получение данных карточки, создание отзыва.

import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../hooks'

const sliceName = 'productions'

//getProduction = getProductById

export const getProductById = createAppAsyncThunk<Card, string>(
	`${sliceName}/getProductById`,
	async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.getProductById(productId)
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)
// createReview

interface Production {
	production: Card | null
	loading: boolean | null
	error: string | null
}

const initialState: Production = {
	production: null,
	loading: false,
	error: null,
}

export const productionSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProductById.fulfilled, (state, { payload }) => {
			state.production = payload
		})
	},
})

export const productionReduce = productionSlice.reducer
