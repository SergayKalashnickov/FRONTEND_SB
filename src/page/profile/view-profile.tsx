import { Button, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { fetchUsers } from '../../services/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../services/hooks'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.user)

	dispatch(fetchUsers())

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
			<Button variant='outlined'>Выйти</Button>
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
