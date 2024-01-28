import { Button, Link, TextField, Typography } from '@mui/material'
import { useSignInMutation } from '../../app/api/api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { batch } from 'react-redux'
import { useAppDispatch } from '../../app/store/hooks'
import { setUser } from '../../app/store/slices/userSlice'
import { setTokens } from '../../app/store/slices/authSlice'
import { objectHasProperty } from '../../shared/utils/commonUtils'
import { getMessageFromError } from '../../shared/utils/errorUtils'

interface SignInFormValues {
	email: string
	password: string
}

export const SingInForm = () => {
	const dispatch = useAppDispatch()
	const [singInRequestFn] = useSignInMutation()
	const { state } = useLocation()
	const navigate = useNavigate()

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			const response = await singInRequestFn(values).unwrap()
			toast.success('Вы успешно вошли в систему')
			batch(() => {
				dispatch(setUser(response.data))
				dispatch(setTokens({ accessToken: response.token, refreshToken: '' }))
				localStorage.setItem('Token', response.token)
			})
			navigate(
				objectHasProperty(state, 'from') && typeof state.from === 'string'
					? state.from
					: '/catalog'
			)
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при авторизации пользователя'
				)
			)
		}
	}

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm({
		defaultValues: DFS,
		resolver: yupResolver(schema),
	})

	return (
		<FromStyled onSubmit={handleSubmit(submitHandler)}>
			<Typography component='h1' variant='h5'>
				Sign In
			</Typography>

			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<TextField
						margin='normal'
						label='Email Address'
						type='email'
						fullWidth
						required
						autoComplete='email'
						error={!!errors.email?.message}
						helperText={errors.email?.message}
						{...field}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<TextField
						label='Password'
						type='password'
						error={!!errors.password?.message}
						helperText={errors.password?.message}
						margin='normal'
						fullWidth
						required
						{...field}
					/>
				)}
			/>

			<Button
				type='submit'
				disabled={isSubmitted && (!isValid || isSubmitting)}
			>
				Sign In
			</Button>

			<Link href='/signup'>{"Don't have an account? Sign Up!"}</Link>
		</FromStyled>
	)
}

const DFS = {
	email: '',
	password: '',
}

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(24).required(),
})

const FromStyled = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`
