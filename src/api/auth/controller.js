import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

export const login = ({ user }, res, next) =>
	sign(user.id)
		.then((accessToken) => ({ accessToken, user: user.view(true) }))
		.then(success(res, 201))
		.catch(next)
