import { initErrorHandler } from './../middleware/error-handler'
import express from 'express'

import thread from './thread'
import sub from './sub'
import user from './user'
import util from './util'
import auth from './auth'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/threads', thread)
router.use('/subs', sub)
router.use('/util', util)

initErrorHandler(router)

export default router