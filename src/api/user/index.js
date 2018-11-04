import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { done } from '../../services/response/'
import { password as passwordAuth, xApi, token } from '../../services/passport'
import { index, showMe, show, create, update, updatePassword, destroy } from './controller'
import { schema } from './model'
export User, { schema } from './model'

const router = new Router()
const { phone, email, password, name, picture, role } = schema.tree

router.get('/',
	token({ required: true, roles: ['admin'] }),
	query(),
	(req, res) => index(req, res, done))


router.get('/me',
	token({ required: true }),
	(req, res) => showMe(req, res, done))


router.get('/:id',
	(req, res) => show(req, res, done))


router.post('/',
	xApi(),
	body({ phone, email, password, name, picture, role }),
	(req, res) => create(req, res, done))


router.put('/:id',
	token({ required: true }),
	body({ name, picture }),
	(req, res) => update(req, res, done))


router.put('/:id/password',
	passwordAuth(),
	body({ password }),
	(req, res) => updatePassword(req, res, done))


router.delete('/:id',
	token({ required: true, roles: ['admin'] }),
	(req, res) => destroy(req, res, done))

export default router
