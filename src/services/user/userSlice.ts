import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../hooks'
import { isActionPending } from '../redux'

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
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
}

export const slice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
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

export const userReducer = slice.reducer
