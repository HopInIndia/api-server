import { Router } from 'express'
import { done } from '../../services/response/'
import { password, xApi, facebook, google } from '../../services/passport'
import { login, token } from './controller'

const router = new Router()

router.post('/',
	xApi(),
	password(),
	(req, res) => login(req, res, done))

router.get('/token',
	xApi(),
	(req, res) => token(req, res, done))

export default router
