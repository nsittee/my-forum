import { Card, Container, Grid } from '@material-ui/core';
import React from 'react'
import { MyCard } from '../components/common/MyCard';

const ChangelogPage = () => {
  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Change Log" />
      <br />
      <Grid container spacing={1} direction="column">
        <Grid item>
          <MyCard header="1.0.0">
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
          </MyCard>
          <br />
          <MyCard header="1.0.4">
            <ul>
              <ul>
                <li>
                  Backend
                  <ul>
                    <li>Refactor code structure</li>
                    <li>Simplified DB connection string</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  Frontend
                  <ul>
                    <li>Refactor code structure</li>
                    <li>Fix thread dialog and card size</li>
                    <li>Add skeleton on main page when loading the thread</li>
                  </ul>
                </li>
              </ul>
            </ul>
          </MyCard>
          <br />
          <MyCard header="1.0.5">
            <ul>
              <ul>
                <li>
                  Backend
                  <ul>
                    <li>Voting thread api</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  Frontend
                  <ul>
                    <li>Update create thread form to use react final form</li>
                    <li>Redesign create thread form</li>
                    <li>Add custom Axios instance </li>
                    <li>Add type for frontend and refactor code with type</li>
                    <li>Implement voting system</li>
                  </ul>
                </li>
              </ul>
            </ul>
          </MyCard>
        </Grid>
      </Grid>
      <br />
    </Container>
  )
}

export default ChangelogPage;
