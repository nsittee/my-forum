import { ErrorStatus } from './../error/index'

export const initErrorHandler = (app) => {
  // Handle endpoint incorrect, 404
  app.use((req, res, next) => {
    const errorStatus: ErrorStatus = {
      message: 'not found',
      status: 404,
    }
    next(errorStatus)
  });

  // Handle and ErrorStatus
  app.use((error: ErrorStatus, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        msg: error.message
      }
    })
  })
}
