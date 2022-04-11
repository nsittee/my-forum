import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { initDatabase } from '../configs/database-config'

export const initMiddleware = (app: express.Express) => {
  // Connect MongoDB
  initDatabase()

  // CORS
  app.use(cors());

  // Parser Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logger
  app.use(morgan('dev'));

  // Passport
  // require('../configs/passport');

  // Static file
  // app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  // app.use(require('../configs/responseFormat'))
}