import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { demoThumbnailUrl, demoVideoUrl, demoChannelUrl, demoChannelTitle, demoProfilePicture, demoVideoTitle } from '../utils/constants'
import { CheckCircle } from '@mui/icons-material'

const VideoCard = ({
	video: {
		id: { videoId },
		snippet,
	},
}) => {
	return (
		<Card sx={{ m: 0, width: { xs: '358px', md: '320px' }, boxShadow: 'none', borderRadius: 0, margin: 1, marginBottom: 2, marginTop: 2 }}>
			<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
				<CardMedia
					image={snippet?.thumbnails?.high?.url}
					alt={snippet?.title}
					component="img"
					sx={{ width: { xs: '358px', md: '320px' }, height: 180 }}
				/>
			</Link>
			<CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
				<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
					<Typography variant="subtitle1" fontWeight="bole" color="#fff">
						{snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
					</Typography>
				</Link>
				<Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
					<Typography variant="subtitle2" fontWeight="bole" color="gray">
						{snippet?.channelTitle || demoChannelTitle}
						<CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
					</Typography>
				</Link>
			</CardContent>
		</Card>
	)
}

export default VideoCard
