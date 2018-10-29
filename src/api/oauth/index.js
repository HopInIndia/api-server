import { Router } from 'express'
import { password, xApi, facebook, google } from '../../services/passport'
import { login, token } from './controller'

const router = new Router()

/**
 * @api {post} /oauth Create oauth
 * @apiName Authenticate using oAuth 2.0
 * @apiGroup Oauth
 * @apiPermission xApi
 * @apiParam {String} access_token xApi access token.
 * @apiSuccess {Object} oauth Oauth's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Oauth not found.
 * @apiError 401 xApi access only.
 */
router.post('/',
	xApi(),
	password(),
	login)

/**
 * @api {get} /oauth/token Exchange token
 * @apiName Exchange token using oAuth 2.0
 * @apiGroup Oauth
 * @apiPermission xApi
 * @apiParam {String} refreshToken xApi access token.
 * @apiSuccess {Object} oauth Oauth's data.
 * @apiError {Object} 401 Invalid refreshToken or xApi access token.
 * @apiError 404 Oauth not found.
 */
router.get('/token',
	xApi(),
	token)

export default router
