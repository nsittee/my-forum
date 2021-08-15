import React from 'react'
import { useHistory } from 'react-router'
import { Card, Typography, Grid, IconButton } from '@material-ui/core'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

const ThreadCard = (props: any) => {
	const history = useHistory()

	const thread = props.thread
	const displayVote = thread.Upvote - thread.Downvote
	const subAuthor = thread.Author ? thread.Author.Username : 'null'
	const subParent = thread.SubParent ? thread.SubParent.SubLongName : 'null'

	const voteHandler = (e: any, vote: number) => {
		console.log('vote clicked ' + vote);
	}
	return (
		<Card onClick={() => history.push(`/r/${subParent}/${thread._id}`)}>
			<Grid container spacing={1}>
				<Card onClick={e => e.stopPropagation()}>
					<IconButton onClick={(e: any) => voteHandler(e, 1)}>
						<KeyboardArrowUp />
					</IconButton>
					<Typography align='center' variant='subtitle2'>{displayVote}</Typography>
					<IconButton onClick={(e: any) => voteHandler(e, -1)}>
						<KeyboardArrowDown />
					</IconButton>
				</Card>
				<Grid item xs={10}>
					<Typography color="textSecondary" noWrap={true}>
						<a href={`/r/${subParent}`} onClick={e => e.stopPropagation()}>
							{subParent} </a>
						: posted by {subAuthor + ' '}
						on {thread.CreatedDate} </Typography>
					<Typography variant="h6"> {thread.Title} </Typography>
				</Grid>
			</Grid>
		</Card>
	)
}

export default ThreadCard
