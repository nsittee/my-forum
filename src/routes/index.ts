import { initErrorHandler } from './../middleware/error-handler'
import express from 'express'

import thread from './thread-route'
import sub from './sub-route'
import user from './user-route'
import util from './util-route'
import auth from './auth-route'
import { initGraphql } from '../graphql'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/threads', thread)
router.use('/subs', sub)
router.use('/util', util)

initGraphql(router)
initErrorHandler(router)

export default router