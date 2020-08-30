const express = require('express');
const router = express.Router();
const ThreadModel = require('../models/thread');
const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
  ThreadModel.find()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .exec()
    .then(threads => res.status(200).json(threads));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  ThreadModel.findOne()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .where('_id', id)
    .exec()
    .then(thread => res.status(200).json(thread));
});

router.post('/', checkAuth, (req, res, next) => {
  const reqThread = req.body.Thread;
  if (!reqThread)
    return res.status(400).json({ message: "invalid json" });

  const thread = new ThreadModel({
    Title: reqThread.Title,
    Content: reqThread.Content
  });
  thread.save().then(newThread => {
    res.status(200).json({
      message: "create new thread completed",
      data: newThread
    });
  }).catch(err => {
    res.status(500).json({ message: "saving thread error" });
  });
});

// router.delete('/:id', (req, res, next) => {
//   const id = req.params.id;
//   res.status(200).json({
//     message: "delete => thread",
//     id: id
//   });
// });

module.exports = router;