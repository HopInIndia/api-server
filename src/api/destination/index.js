import { Router } from 'express'
import { done } from '../../services/response/'
import { xApi, token } from '../../services/passport'
import { list } from './controller'

const router = new Router()

router.get('/',
	xApi(),
	token({ required: true }),
	async (req, res) => done(res, await list(req.params)))

export default router
