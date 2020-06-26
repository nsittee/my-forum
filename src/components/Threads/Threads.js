import React, { useState } from 'react';
import Thread from './Thread'
import Grid from '@material-ui/core/Grid';

const Threads = (props) => {
  // if only getting the state, using one variable is okay
  let threads = getContent();
  let contents = threads.map((thread) => {
    return <Thread key={thread.threadId} thread={thread} />
  })

  console.log('this is contents', contents)

  return (
    <Grid container spacing={1}>
      {contents}
    </Grid>
  )
}

const getContent = () => {
  // Generate contents on Thread
  const threads =
    [
      {
        threadId: 0,
        threadTitle: 'I ran over my neighbors cat this morning',
        subRedditId: 0,
        subReddit: 'TIFU',
        content: 'Content 1',
        author: 'Author 1',
        published: {
          date: '2020-06-12',
          time: '08:30:25'
        },
        upVote: 25,
        downVote: 12,
        comments: null
      }, {
        threadId: 0,
        threadTitle: 'I ran over my neighbors cat this morning',
        subRedditId: 0,
        subReddit: 'TIFU',
        content: 'Content 1',
        author: 'Author 1',
        published: {
          date: '2020-06-12',
          time: '08:30:25'
        },
        upVote: 25,
        downVote: 12,
        comments: null
      }, {
        threadId: 0,
        threadTitle: 'I ran over my neighbors cat this morning',
        subRedditId: 0,
        subReddit: 'TIFU',
        content: 'Content 1',
        author: 'Author 1',
        published: {
          date: '2020-06-12',
          time: '08:30:25'
        },
        upVote: 25,
        downVote: 12,
        comments: null
      },
    ];

  return threads;
}

export default Threads;
