import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './types'
import { Api } from '../api/api'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	extra: Api
}>()
