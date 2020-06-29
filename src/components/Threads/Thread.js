import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const Thread = props => {
	return (
		<Grid item xs={12}>
			<Card>
				<CardContent>
					<Grid container>
						<Grid item xs={1}>
							<Typography variant='h5'>{props.thread.upVote}</Typography>
							<Typography variant='h5'>{props.thread.downVote}</Typography>
						</Grid>
						<Grid item xs={11}>
							<Typography color="textSecondary">
								{props.thread.subReddit}: posted by {props.thread.author + ' '}
                                on {props.thread.published.date} {props.thread.published.time}
							</Typography>
							<Typography variant="h6" component="h2">
								{props.thread.threadTitle}
							</Typography>
							<Button onClick={() => props.createModal(props.thread.threadId)}>Read More</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

Thread.propTypes = {

};

export default Thread;
