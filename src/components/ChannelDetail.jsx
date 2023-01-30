import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromApi'

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null)
	const [videos, setVideos] = useState([])

	const { id } = useParams()

	useEffect(() => {
		const fetchResults = async () => {
			const data = await fetchFromAPI(`channels?part=snippet&id=${id}`)

			setChannelDetail(data?.items[0])

			const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`)

			setVideos(videosData?.items)
		}
		fetchResults()
	}, [id])

	return (
		<Box minHeight="95vh">
			<Box>
				<div
					style={{
						zIndex: 10,
						height: '300px',
						background: 'linear-gradient(90deg, rgba(36,0,0,1) 0%, rgba(121,9,9,1) 38%, rgba(255,0,104,1) 100%)',
					}}
				/>
				<ChannelCard channelDetail={channelDetail} marginTop="-110px" />
			</Box>
			<Box display="flex" p="2">
				<Box sx={{ mr: { sm: '100px' } }} />
				<Videos videos={videos} />
			</Box>
		</Box>
	)
}

export default ChannelDetail
