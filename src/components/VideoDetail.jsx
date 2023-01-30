import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { fetchFromAPI } from '../utils/fetchFromApi'
import { Box, Stack } from '@mui/system'
import { Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Videos } from './'

const VideoDetail = () => {
	const [videoDetail, setVideoDetail] = useState(null)
	const [videos, setVideos] = useState(null)
	const { id } = useParams()

	useEffect(() => {
		const fetchResults = async () => {
			const videodata = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
			setVideoDetail(videodata?.items[0])

			const data = await fetchFromAPI(`search?part=snippet&realtedToVideoId=${id}&type=video`)
			setVideos(data?.items)
		}
		fetchResults()
	}, [id])

	if (!videoDetail?.snippet) return 'Loading.....'
	if (!videos?.length) return 'Loading.....'

	const {
		snippet: { title, channelId, channelTitle },
		statistics: { viewCount, likeCount },
	} = videoDetail

	return (
		<Box minHeight="95vh">
			<Stack direction={{ xs: 'column', md: 'row' }}>
				<Box flex={1}>
					<Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
						<ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
						{/* <ReactPlayer url={`https://youtu.be/${id}`} className="react-player" controls /> */}
						<Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
							{title}
						</Typography>
						<Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
							<Link to={`/channel/${channelId}`}>
								<Typography variant={{ sm: 'subtitle1 ', md: 'h6' }} color="#fff">
									{channelTitle}
									<CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
								</Typography>
							</Link>
							<Stack direction="row" gap="20px" alignItems="center">
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(viewCount).toLocaleString()} Views
								</Typography>
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(likeCount).toLocaleString()} Likes
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
					<Videos videos={videos} direction="column" />
				</Box>
			</Stack>
		</Box>
	)
}

export default VideoDetail
