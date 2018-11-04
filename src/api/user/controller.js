import { User } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, callback) =>
	User.find(query, select, cursor)
		.then(users => users.map(user => user.view()))
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))

export const show = ({ params }, res, callback) =>
	User.findById(params.id)
		.then(user => user ? user.view() : null)
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))

export const userData = ({ params }, res, callback) =>
	User.findById(params.id)
		.then(user => user ? user.view(true) : null)
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))

export const showMe = ({ user }, res, callback) =>
	callback(res, 200, user.view(true))

export const create = ({ bodymen: { body } }, res, callback) => {
	User.create(body)
		.then(user => user.view(true))
		.then(data => callback(res, 201, data))
		.catch(err => {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.status(409).json({
					valid: false,
					param: 'email',
					message: 'email already registered'
				})
			} else {
				callback(res, 400, err)
			}
		})
}

export const update = ({ bodymen: { body }, params, user }, res, callback) =>
	User.findById(params.id === 'me' ? user.id : params.id)
		.then(callback(res, 404))
		.then((result) => {
			if (!result) return null
			const isAdmin = user.role === 'admin'
			const isSelfUpdate = user.id === result.id
			if (!isSelfUpdate && !isAdmin) {
				res.status(401).json({
					valid: false,
					message: 'You can\'t change other user\'s data'
				})
				return null
			}
			return result
		})
		.then(user => user ? Object.assign(user, body).save() : null)
		.then(user => user ? user.view(true) : null)
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))

export const updatePassword = ({ bodymen: { body }, params, user }, res, callback) =>
	User.findById(params.id === 'me' ? user.id : params.id)
		.then(callback(res, 404))
		.then((result) => {
			if (!result) return null
			const isSelfUpdate = user.id === result.id
			if (!isSelfUpdate) {
				callback(res, 401, {
					valid: false,
					param: 'password',
					message: 'You can\'t change other user\'s password'
				})
				return null
			}
			return result
		})
		.then(user => user ? user.set({ password: body.password }).save() : null)
		.then(user => user ? user.view(true) : null)
		.then(data => callback(res, 200, data))
		.catch(error => callback(res, 400, error))

export const destroy = ({ params }, res, callback) =>
	User.findById(params.id)
		.then(callback(res, 404))
		.then(user => user ? user.remove() : null)
		.then(data => callback(res, 204, data))
		.catch(error => callback(res, 400, error))
