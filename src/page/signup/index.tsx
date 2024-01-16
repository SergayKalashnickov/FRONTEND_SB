import { yupResolver } from '@hookform/resolvers/yup'
import {
	Avatar,
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignUpMutation } from '../../app/api/api'
import { getMessageFromError } from '../../shared/utils/errorUtils'
import * as yup from 'yup'

interface SignUpFormValues {
	email: string
	group: string
	password: string
}

export const SignUpForm = () => {
	const navigate = useNavigate()
	const [signUpRequestFn] = useSignUpMutation()
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: DFS,
		resolver: yupResolver(signUpFormSchema),
	})

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			await signUpRequestFn(values).unwrap()
			toast.success('Вы успешно зарегистрированы! Войдите в систему')
			navigate('/signin')
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при регистрации пользователя'
				)
			)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					{/* <LockOutlinedIcon /> */}
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ mt: 1 }}
				>
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
						name='group'
						control={control}
						render={({ field }) => (
							<TextField
								label='Group Id'
								type='text'
								margin='normal'
								error={!!errors.group?.message}
								helperText={errors.group?.message}
								fullWidth
								required
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
						Sign Up
					</Button>
				</Box>
			</Box>
		</Container>
	)
}

const DFS = {
	email: '',
	group: '',
	password: '',
}

const signUpFormSchema = yup.object({
	email: yup.string().email().required(),
	group: yup.string().lowercase().required().strict(),
	password: yup.string().min(6).max(24).required(),
})
