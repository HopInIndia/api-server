import { Router } from 'express'
import { password, master, facebook, google } from '../../services/passport'
import { login, token } from './controller'

const router = new Router()

/**
 * @api {post} /oauth Create oauth
 * @apiName Authenticate using oAuth 2.0
 * @apiGroup Oauth
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} oauth Oauth's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Oauth not found.
 * @apiError 401 master access only.
 */
router.post('/',
	master(),
	password(),
	login)

/**
 * @api {get} /oauth/token Exchange token
 * @apiName Exchange token using oAuth 2.0
 * @apiGroup Oauth
 * @apiPermission master
 * @apiParam {String} refreshToken master access token.
 * @apiSuccess {Object} oauth Oauth's data.
 * @apiError {Object} 401 Invalid refreshToken or master access token.
 * @apiError 404 Oauth not found.
 */
router.get('/token',
	master(),
	token)

export default router
