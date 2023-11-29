import { useLocation, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

export const SingleCard = () => {
	const { itemId } = useParams()
	const location = useLocation()

	console.log(itemId)

	console.log(location)

	return (
		<div>
			<Button href={location.state ? location.state.pathname : '/catalog'}>
				Back
			</Button>
		</div>
	)
}
