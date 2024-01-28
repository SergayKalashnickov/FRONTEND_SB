import { Button, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { fetchUsers } from '../../app/store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.user)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	const handlerExit = () => {
		localStorage.clear()
		navigate('/signIn')
	}

	if (!user.user) return null

	return (
		<PageProfile>
			<Typography variant='h3'>Профиль</Typography>
			{user.user ? (
				<ProfilerInfo>
					<Typography variant='h5'>{user.user.name}</Typography>
					<Typography>{user.user.about}</Typography>
					<Typography>{user.user.email}</Typography>
					<Link to='/profile-edit'>Изменить</Link>
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
