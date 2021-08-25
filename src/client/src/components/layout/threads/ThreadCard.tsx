import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Card, Typography, Grid, IconButton } from '@material-ui/core'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'
import { myAxios } from '../../../config/axios-config'
import AuthContext from '../../../context/auth-context'
import { IThread } from '../../../shared/model/thread.model'

const ThreadCard = (props: any) => {
	const [thread, setThread] = useState<IThread>(props.thread)
	const authContext = useContext(AuthContext)
	const history = useHistory()

	const displayVote = thread.Upvote!! - thread.Downvote!!
	const subAuthor = thread.Author ? thread.Author.Username : 'null'
	const subParent = thread.SubParent ? thread.SubParent.SubLongName : 'null'
	const vote = thread.vote

	const voteHandler = async (e: any, vote: string) => {
		const resp = await myAxios.get<IThread>(`/api/threads/vote/${thread._id}/${vote}`, authContext.header)
		const respThread = resp.data
		setThread({
			...thread,
			Upvote: respThread.Upvote,
			Downvote: respThread.Downvote,
			vote: thread.vote === vote ? '' : vote
		})
	}
	return (
		<Card onClick={() => history.push(`/r/${subParent}/${thread._id}`)}>
			<Grid container spacing={1}>
				<Card onClick={e => e.stopPropagation()}>
					<IconButton onClick={(e: any) => voteHandler(e, 'up')}>
						<KeyboardArrowUp color={vote === 'up' ? "primary" : "inherit"} />
					</IconButton>
					<Typography align='center' variant='subtitle2'>{displayVote}</Typography>
					<IconButton onClick={(e: any) => voteHandler(e, 'down')}>
						<KeyboardArrowDown color={vote === 'down' ? "error" : "inherit"} />
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
