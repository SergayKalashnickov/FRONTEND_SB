import { Button, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useContext } from 'react'
import { UserContext } from '../../context/user-context'

export const Profile = () => {
	const user = useContext<User | null>(UserContext)

	if (!user) return null

	return (
		<PageProfile>
			<Typography variant='h3'>Профиль</Typography>
			<ProfilerInfo>
				<Typography variant='h5'>{user.name}</Typography>
				<Typography>{user.about}</Typography>
				<Typography>{user.email}</Typography>
				<Button variant='outlined'>Изменить</Button>
			</ProfilerInfo>
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
