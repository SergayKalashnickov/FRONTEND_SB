import { Button, Input, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { editUsers } from '../../services/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { useState } from 'react'

export const ProfileEdit = () => {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector((state) => state.user)
	const [name, setName] = useState<string>(
		currentUser.user ? currentUser.user.name : ''
	)
	const [about, setAbout] = useState<string>(
		currentUser.user ? currentUser.user.about : ''
	)

	const onHandleSaveClick = () => {
		dispatch(editUsers({ name, about }))
	}

	return (
		<PageProfile>
			<Typography variant='h3'>Профиль</Typography>
			<Button href='/profile'>Назад</Button>
			<ProfilerInfo>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='name'
				/>
				<Input
					value={about}
					onChange={(e) => setAbout(e.target.value)}
					placeholder='about'
				/>
				<Button variant='outlined' onClick={onHandleSaveClick}>
					Сохранить
				</Button>
			</ProfilerInfo>
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
