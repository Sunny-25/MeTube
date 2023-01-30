import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { VideoCard, ChannelCard } from './'

const Videos = ({ videos, direction }) => {
	return (
		<Stack direction={direction || 'row'} flexWrap="wrap" alignItems="center" justifyContent="center">
			{videos.map((item, index) => (
				<Box key={index}>
					{item.id.videoId && <VideoCard video={item} />}
					{item.id.channelId && <ChannelCard channelDetail={item} />}
				</Box>
			))}
		</Stack>
	)
}

export default Videos
