import React from 'react';
import { Card, Typography, Grid } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

import ThreadContext from '../../context/thread-context'

const Thread = props => {
	const thread = props.thread;
	const displayVote = thread.Upvote - thread.Downvote;
	const context = React.useContext(ThreadContext);
	return (
		<Grid item xs={12}>
			<Card onClick={() => props.onThreadDialogClicked(thread._id)}>
				<Grid container spacing={1}>
					<Grid item>
						<Card onClick={e => context.voteThreadHandler(e, thread, 'up')}><KeyboardArrowUp /></Card>
						<Typography align='center' variant='h6'>{displayVote}</Typography>
						<Card onClick={e => context.voteThreadHandler(e, thread, 'down')}><KeyboardArrowDown /></Card>
					</Grid>

					<Grid item>
						<Typography color="textSecondary">
							{thread.SubParent.SubLongName}
							: posted by {thread.Author.Username + ' '}
							on {thread.CreatedDate}
						</Typography>
						<Typography variant="h6">
							{thread.Title}
						</Typography>
						<Typography variant="body1">
							{thread.Content}
						</Typography>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

Thread.propTypes = {

};

export default Thread;
