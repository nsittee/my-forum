const express = require('express');
const router = express.Router();

const SubModel = require('../models/sub');
const ThreadModel = require('../models/thread');

router.get('/', (req, res, next) => {
  ThreadModel.find()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .exec()
    .then(threads => res.status(200).json({
      message: "get all thread",
      data: {
        SubThread: threads
      }
    }));
});

router.get('/:name', (req, res) => {
  const subName = req.params.name;
  SubModel.findOne()
    .where({ SubLongName: subName })
    .populate({
      path: 'SubThread',
      populate: [{
        path: 'Author',
        select: 'Username'
      }, {
        path: 'SubParent',
        select: ['SubLongName', 'SubShortName']
      }]
    })
    .exec()
    .then(sub => {
      res.status(200).send({
        message: 'get thread for sub completed',
        data: sub
      });
    });
});

module.exports = router
