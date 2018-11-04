import { sign } from '../../services/jwt'

export const login = ({ user }, res, callback) => {
	sign(user.id)
		.then(accessToken => ({ accessToken, user: user.view(true) }))
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))
}
