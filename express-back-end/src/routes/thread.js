const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "get => thread"
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "get => thread",
    id: id
  });
});

router.post('/', (req, res, next) => {
  const thread = {
    threadTitle: req.body.threadTitle

  }
  res.status(200).json({
    message: "post => thread",
    body: thread
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "delete => thread",
    id: id
  });
});

module.exports = router;