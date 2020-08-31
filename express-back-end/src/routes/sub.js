const express = require('express');
const router = express.Router();

const SubModel = require('../models/sub');
const ThreadModel = require('../models/thread');

router.get('/home', (req, res, next) => {
  ThreadModel.find()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .exec()
    .then(threads => res.status(200).json(threads));
});

router.get('/:name', (req, res) => {
  const subName = req.params.name;
  SubModel.findOne()
    .where({ SubLongName: subName })
    .populate('SubThread', [
      'Title',
      'Content',
      'Upvote',
      'Downvote',
      'CreatedDate',
      'Author'
    ])
    .exec()
    .then(sub => {
      res.send({
        message: 'get thread for sub completed',
        data: sub
      });
    });
});

module.exports = router
