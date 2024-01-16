import { Button, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { fetchUsers } from '../../app/store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { clearTokens } from '../../app/store/slices/authSlice'
import { useEffect } from 'react'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.user)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	const handlerExit = () => dispatch(clearTokens)

	if (!user.user) return null

	return (
		<PageProfile>
			<Typography variant='h3'>Профиль</Typography>
			{user.user ? (
				<ProfilerInfo>
					<Typography variant='h5'>{user.user.name}</Typography>
					<Typography>{user.user.about}</Typography>
					<Typography>{user.user.email}</Typography>
					<Button href='/profile-edit' variant='outlined'>
						Изменить
					</Button>
				</ProfilerInfo>
			) : null}
			<Button variant='outlined' onClick={handlerExit}>
				Выйти
			</Button>
		</PageProfile>
	)
}

const PageProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	flex: auto;
	padding-left: 300px;
	gap: 30px;
`

const ProfilerInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`
