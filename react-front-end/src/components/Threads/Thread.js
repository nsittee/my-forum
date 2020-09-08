import React from 'react';
import { useHistory } from 'react-router';
import { Card, Typography, Grid, Link } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

import ThreadContext from '../../context/thread-context'

const Thread = props => {
	const history = useHistory();
	const thread = props.thread;
	const displayVote = thread.Upvote - thread.Downvote;
	const context = React.useContext(ThreadContext);
	return (
		<Grid item xs={12}>
			<Card onClick={() => history.push(`/r/${thread.SubParent.SubLongName}/${thread._id}`)}>
				<Grid container spacing={1}>
					<Grid item>
						<Card onClick={e => context.voteThreadHandler(e, thread, 'up')}><KeyboardArrowUp /></Card>
						<Typography align='center' variant='h6'>{displayVote}</Typography>
						<Card onClick={e => context.voteThreadHandler(e, thread, 'down')}><KeyboardArrowDown /></Card>
					</Grid>

					<Grid item>
						<Typography color="textSecondary">
							<a href={`/r/${thread.SubParent.SubLongName}`} onClick={e => e.stopPropagation()}>
								{thread.SubParent.SubLongName} </a>
							: posted by {thread.Author.Username + ' '}
							on {thread.CreatedDate}
						</Typography>
						<Typography variant="h6"> {thread.Title} </Typography>
					</Grid>
				</Grid>
			</Card>
		</Grid >
	);
};

const subParentClick = (e, thread, history) => {
	e.stopPropagation();
	const newUrl = `/r/${thread.SubParent.SubLongName}`;
	console.log(newUrl);
	history.push(newUrl);
	window.location.reload();
}

Thread.propTypes = {

};

export default Thread;
