export const initErrorHandler = (app) => {
  app.use((req, res, next) => {
    var err = new Error("Not found");
    next(err);
  });

  // FIXME: not sure will work
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        msg: error.message
      }
    })
  })
}
