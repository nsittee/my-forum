const router = require('express').Router();

router.use('/threads', require('./thread'));
router.use('/users', require('./user'));
router.use('/sub', require('./sub'));
router.use('/util', require('./util'));

module.exports = router;