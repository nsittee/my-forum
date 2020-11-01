import { Card, Grid } from '@material-ui/core';
import React from 'react'

const ChangelogPage = () => {
  return (
    <div>
      <h1>About</h1>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs>
            <h3>Release-1.0.0</h3>
          </Grid>
          <Grid item xs={10}>
            <ul>
              <ul>
                <li>
                  Backend
                <ul>
                    <li>Using MongoDB to store information, these include User, Thread and Sub</li>
                    <li>Using Express JS framwwork for the to perform backend and communicate with DB</li>
                    <li>Using mongoose to open connection to MongoDB and perform basic CRUD operation</li>
                    <li>Very basic authentication using JWT and encrypt user password using bcryptjs</li>
                    <li>A helper function that will populate database with mock data</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  Frontend
                <ul>
                    <li>React JS for frontend UI</li>
                    <li>Using MaterialUI for the most part</li>
                    <li>Using stateless functional component for most of the project</li>
                    <li>Using hook like useState, useEffect, useLocation</li>
                    <li>Using react-router-dom to handle to navigate inside the website</li>
                    <li>Use react-cookie to store token and persist the session after each sign in</li>
                    <li>Using react-final-form to manage user input like submitting new thread</li>
                    <li>Using axios to make a callout to the backend part of the project</li>
                  </ul>
                </li>
              </ul>
            </ul>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default ChangelogPage;
