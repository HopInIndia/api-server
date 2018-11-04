import { Router } from 'express'
import { login } from './controller'
import { done } from '../../services/response/'
import { password, xApi, facebook, google } from '../../services/passport'

const router = new Router()

router.post('/',
	xApi(),
	password(),
	(req, res) => login(req, res, done))

router.post('/facebook',
	facebook(),
	(req, res) => login(req, res, done))

router.post('/google',
	google(),
	(req, res) => login(req, res, done))

export default router
