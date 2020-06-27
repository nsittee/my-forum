import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const Thread = props => {
    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={1} justify='center'>
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
