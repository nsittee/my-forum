import React from 'react';
import { useHistory } from 'react-router';
import { Card, Typography, Grid } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

import ThreadContext from '../../../context/thread-context'

const Thread = props => {
	const history = useHistory();
	const context = React.useContext(ThreadContext);

	const thread = props.thread;
	const displayVote = thread.Upvote - thread.Downvote;
	const subAuthor = thread.Author ? thread.Author.Username : 'null';
	const subParent = thread.SubParent ? thread.SubParent.SubLongName : 'null';

	return (
		<Grid item xs={12}>
			<Card onClick={() => history.push(`/r/${subParent}/${thread._id}`)}>
				<Grid container spacing={1}>
					<Grid item xs={1}>
						<KeyboardArrowUp />
						<Typography align='center' variant='h6'>{displayVote}</Typography>
						<KeyboardArrowDown />
					</Grid>

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
		</Grid >
	);
};

export default Thread;
