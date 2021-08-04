import express from 'express'

import thread from './thread'
import sub from './sub'
import user from './user'
import util from './util'


const router = express.Router()

router.use('/threads', thread);
router.use('/users', user);
router.use('/subs', sub);
router.use('/util', util);

export default router