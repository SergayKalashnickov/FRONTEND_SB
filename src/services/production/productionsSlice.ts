import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../hooks'
import { isActionPending } from '../redux'

const sliceName = 'productions'

interface fetchProductionsPayload {
	query?: string
	page?: number
	limit?: number
}

export const fetchProductions = createAppAsyncThunk<
	FetchAllProduct,
	fetchProductionsPayload
>(
	`${sliceName}/fetchProductions`,
	async (
		{ query = '', page },
		{ fulfillWithValue, rejectWithValue, extra: api }
	) => {
		try {
			const data = await api.getAllProducts({ query, page, limit: PAGE_SIZE })
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const deleteProductions = createAppAsyncThunk<
	Card,
	{ productId: string }
>(
	`${sliceName}/deleteProductions`,
	async ({ productId }, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.deleteProduction({ productId })
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const searchProductions = (payload: string) =>
	fetchProductions({ query: payload })

export const setLike = createAppAsyncThunk<void, string>(
	`${sliceName}/setLike`,
	async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.addLikes({ productId })
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const deleteLike = createAppAsyncThunk<void, string>(
	`${sliceName}/deleteLike`,
	async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.addLikes({ productId })
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

interface Productions {
	productions: Card[] | null
	loading: boolean | null
	error: string | null
	totalPage: number
}

const initialState: Productions = {
	productions: null,
	totalPage: 1,
	loading: false,
	error: null,
}

export const productionSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductions.fulfilled, (state, { payload }) => {
				state.productions = payload.products
				state.totalPage = payload.total
			})
			.addMatcher(isActionPending(`/${sliceName}`), (state, { paylaod }) => {
				state.loading = false
				state.error = paylaod
			})
	},
})

const PAGE_SIZE = 12

export const productionsReducer = productionSlice.reducer
