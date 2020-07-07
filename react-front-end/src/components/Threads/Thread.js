import React from 'react';
import { Card, Typography, CardActionArea, Grid, Button } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'


const Thread = props => {
	const displayVote = props.thread.upVote - props.thread.downVote;

	return (
		<Grid item xs={12}>
			<Card onClick={() => props.onThreadDialogClicked(props.thread.threadId)}>
				<CardActionArea >
					<Grid container spacing={1}>
						<Grid item>
							<Button onClick={e => props.voteThreadHandler(e, props.thread, 'up')}><KeyboardArrowUp /></Button>
							<Typography align='center' variant='h6'>{displayVote}</Typography>
							<Button onClick={e => props.voteThreadHandler(e, props.thread, 'down')}><KeyboardArrowDown /></Button>

						</Grid>
						<Grid item xs={11}>
							<Typography color="textSecondary">
								{props.thread.subReddit}: posted by {props.thread.author + ' '}
                                on {props.thread.published.date} {props.thread.published.time}
							</Typography>
							<Typography variant="h6" component="h2">
								{props.thread.threadTitle}
							</Typography>
						</Grid>
					</Grid>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

Thread.propTypes = {

};

export default Thread;
