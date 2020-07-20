const express = require('express');
const router = express.Router();

const UserModel = require('../models/user');

router.get('/', (req, res, next) => {
  UserModel.find().exec().then(users => {
    res.status(200).json(users);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "get => user",
    id: id
  });
});

router.post('/', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  }
  res.status(200).json({
    message: "post => user",
    body: user
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "delete => user",
    id: id
  });
});

module.exports = router;