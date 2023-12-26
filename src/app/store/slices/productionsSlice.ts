import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../hooks'
import { isActionPending } from '../redux'

const sliceName = 'productions'

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
	search: string
	pageActive: number
}

const initialState: Productions = {
	productions: null,
	totalPage: 1,
	loading: false,
	error: null,
	search: '',
	pageActive: 1
}

export const productionSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		cleanUp() {
			return initialState
		},
		setSearch(state, action: PayloadAction<string>) {
			console.log(action.payload)
			state.search = action.payload
		},
		nextPage(state) {
			console.log(state.pageActive)
			state.pageActive = state.pageActive + 1
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isActionPending(`/${sliceName}`),
			(state, { paylaod }) => {
				state.loading = false
				state.error = paylaod
			}
		)
	},
})

export const { cleanUp, setSearch, nextPage } = productionSlice.actions
export const productionsReducer = productionSlice.reducer
