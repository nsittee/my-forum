import React from 'react';
import { Card, Typography, Grid } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

import ThreadContext from '../../context/thread-context'

const Thread = props => {
	const displayVote = props.thread.upVote - props.thread.downVote;
	const context = React.useContext(ThreadContext);

	return (
		<Grid item xs={12}>
			<Card onClick={() => props.onThreadDialogClicked(props.thread._id)}>
				<Grid container spacing={1}>
					<Grid item>
						<Card onClick={e => context.voteThreadHandler(e, props.thread, 'up')}><KeyboardArrowUp /></Card>
						<Typography align='center' variant='h6'>{displayVote}</Typography>
						<Card onClick={e => context.voteThreadHandler(e, props.thread, 'down')}><KeyboardArrowDown /></Card>
					</Grid>

					<Grid item>
						<Typography color="textSecondary">
							{props.thread.subReddit}: posted by {props.thread.author + ' '}
                                on {props.thread.published.date} {props.thread.published.time}
						</Typography>
						<Typography variant="h6" component="h2">
							{props.thread.threadTitle}
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
