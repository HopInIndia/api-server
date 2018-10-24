import { generateToken, decryptToken } from '../../services/crypto'
import { success } from '../../services/response/'
import { sign } from '../../services/jwt'

export const login = ({ user }, res, next) =>{
	const refreshToken = generateToken(user.id)
	sign(user.id)
		.then((accessToken) => ({ refreshToken, accessToken, user: user.view(true) }))
		.then(success(res, 201))
		.catch(next)
}

export const token = (req, res, next) =>{
	const refreshToken = req.query.refresh_token
	const decryptedToken = decryptToken(refreshToken)
	if(!decryptedToken) { res.status(401).end() }
	sign(decryptedToken)
		.then((accessToken) => ({ refreshToken, accessToken }))
		.then(success(res, 201))
		.catch(err => res.status(401).end())
}