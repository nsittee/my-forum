const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Thread = require('../models/thread');
const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
  Thread.find().populate('threadPoster', 'userName').exec().then(threads => {
    res.status(200).json(threads);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "get => thread",
    id: id
  });
});

router.post('/', checkAuth, (req, res, next) => {
  const newThread = {
    threadTitle: req.body.threadTitle
  }
  res.status(200).json({
    message: "post => thread",
    body: newThread
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "delete => thread",
    id: id
  });
});

module.exports = router;