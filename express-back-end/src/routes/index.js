const router = require('express').Router();

router.use('/threads', require('./thread'));
router.use('/users', require('./user'));
router.use('/util', require('./util'));

module.exports = router;