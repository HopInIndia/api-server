import { generateToken, decryptToken } from '../../services/crypto'
import { sign } from '../../services/jwt'
import { userData } from '../user/controller'

export const login = ({ user }, res, callback) => {
	const refreshToken = generateToken(user.id)
	sign(user.id)
		.then(accessToken => ({ refreshToken, accessToken, user: user.view(true) }))
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))
}

export const token = ({ user, query }, res, callback) => {
	const refreshToken = query.refreshToken
	if(refreshToken && refreshToken.length == 72){
		const decryptedToken = decryptToken(query.refresh_token || query.refreshToken)
		if(!decryptedToken) {
			callback(res, 401, {
				message: 'Inavlid Token'
			})
		}
		userData({ params: { id: decryptedToken }}, res, (res, status, user) => {
			if(status == 200){
				sign(decryptedToken)
					.then(accessToken => ({ refreshToken, accessToken, user: user }))
					.then(data => callback(res, 200, data))
					.catch(error => callback(res, 401, error))				
			}else{
				callback(res, 401, {
					message: 'Inavlid Token'
				})				
			}
		})
	}else{
		callback(res, 401, {
			message: 'Inavlid Token'
		})
	}
}