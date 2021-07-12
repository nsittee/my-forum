module.exports = (app) => {
  app.use((req, res, next) => {
    var err = new Error("Not found");
    err.status = 404;
    next(err);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        msg: error.message
      }
    })
  })
};