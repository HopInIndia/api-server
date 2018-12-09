import { Router } from 'express'
import { done } from '../../services/response/'
import { xApi, token } from '../../services/passport'
import { list, show, create, update, remove } from './controller'

const router = new Router()

router.get('/',
	xApi(),
	token({ required: true }),
	async (req, res) => done(res, await list(req.params, req.user)))

router.get('/:id',
	xApi(),
	token({ required: true }),
	async (req, res) => done(res, await show(req.params, req.user)))

router.post('/',
	xApi(),
	token({ required: true, roles: ['admin'] }),
	async (req, res) => done(res, await create(req.body, req.user)))

router.put('/:id',
	xApi(),
	token({ required: true, roles: ['admin'] }),
	async (req, res) => done(res, await update(req.params, req.body, req.user)))

router.delete('/:id',
	xApi(),
	token({ required: true, roles: ['admin'] }),
	async (req, res) => done(res, await remove(req.params, req.user)))

export default router
