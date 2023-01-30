import { Box, Stack, Typography } from '@mui/material'
import Sidebar from './Sidebar'
import { Videos } from './'

import { fetchFromAPI } from '../utils/fetchFromApi'
import { useEffect, useState } from 'react'

const Feed = () => {
	const [selectedCat, setSelectedCat] = useState('New')
	const [videos, setVideos] = useState([])

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${selectedCat} `).then((data) => {
			setVideos(data.items)
		})
	}, [selectedCat])

	return (
		<Stack
			sx={{
				flexDirection: { sx: 'column', md: 'row' },
			}}>
			<Box
				sx={{
					height: { sx: 'auto', md: '92vh' },
					borderRight: '1px solid #3d3d3d',
					px: { sx: 0, md: 2 },
				}}>
				<Sidebar selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
				<Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
					Copyright 2023 MeTUbe
				</Typography>
			</Box>

			<Box
				p={2}
				sx={{
					overflow: 'auto',
					height: '90vh',
					flex: 2,
				}}>
				<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
					{selectedCat}
					<span
						style={{
							color: '#f31503',
							marginLeft: '12px',
						}}>
						videos
					</span>
				</Typography>
				<Videos videos={videos} />
			</Box>
		</Stack>
	)
}

export default Feed
