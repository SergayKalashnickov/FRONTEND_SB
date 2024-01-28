import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../hooks'
import { isActionPending } from '../redux'
import { RootState } from '../types'

const sliceName = 'user'

export const fetchUsers = createAppAsyncThunk<User>(
	`${sliceName}/fetchUsers`,
	async (_, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.getUserInfo()
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const editUsers = createAppAsyncThunk<
	User,
	Pick<User, 'name' | 'about'>
>(
	`${sliceName}/editUsers`,
	async (payload, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.setUserInfo(payload)
			return fulfillWithValue(data)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

interface UserState {
	user: User | null
	loading: boolean | null
	error: string | null
	basket?: Array<{
		id: string
		counter: number
	}>
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
	basket: [],
}

export const slice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setUser(_, action: PayloadAction<User>) {
			return { user: action.payload, loading: false, error: null }
		},
		addProductBasket(
			state,
			action: PayloadAction<{
				id: string
				counter: number
			}>
		) {
			if (!state.basket) state.basket = []
			// state.basket.push(action.payload)
			const itemIndex = state.basket.findIndex(
				(backet) => backet.id === action.payload.id
			)

			if (itemIndex === -1) state.basket.push(action.payload)

			if (itemIndex !== -1 && state.basket[itemIndex]) {
				if (action.payload.counter === 1) state.basket[itemIndex].counter += 1
				if (action.payload.counter === -1) state.basket[itemIndex].counter -= 1
				if (state.basket[itemIndex].counter === 0) {
					state.basket.splice(itemIndex, 1)
				}
			}
			// else state.basket.push(action.payload)
			// if (action.payload.counter === 0 && state.basket)
			// 	state.basket = state.basket.slice(itemIndex, 1)
		},
		deleteProductBasket(
			state,
			action: PayloadAction<{
				id: string
			}>
		) {
			if (state.basket) {
				const itemIndex = state.basket.findIndex(
					(backet) => backet.id === action.payload.id
				)
				state.basket = state.basket.slice(itemIndex, 1)
			}
		},
		cleanUp() {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, { payload }) => {
				state.loading = true
				state.user = payload
			})
			.addCase(editUsers.fulfilled, (state, { payload }) => {
				state.user = payload
			})
			.addMatcher(isActionPending(`/${sliceName}`), (state) => {
				state.loading = false
			})
	},
})

export const userSelector = (state: RootState) => state.user
export const { setUser, cleanUp, addProductBasket } = slice.actions
export const userReducer = slice.reducer
