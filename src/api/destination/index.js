import { Router } from 'express'
import { done } from '../../services/response/'
import { xApi, token } from '../../services/passport'
import { list, create } from './controller'

const router = new Router()

router.get('/',
	xApi(),
	token({ required: true }),
	async (req, res) => done(res, await list(req.params)))

router.post('/',
	xApi(),
	token({ required: true, roles: ['admin'] }),
	async (req, res) => done(res, await create(req.body, req.user)))

export default router
