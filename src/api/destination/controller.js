import { jwtSign, jwtVerify } from '../../services/jwt/'
import { Destination } from './model'

export const list = async ({ offset, limit, type, searchTerm}, { role }) => {
	try{

		let params = {}
		if(type){
			params.type = type
		}
		if(searchTerm) {
			params.name = new RegExp(searchTerm, "i")
		}
		const destinations = await Destination
									.find(params)
									.limit(limit || 10)
									.skip(offset || 0)
									.sort({
										timestamps: 'desc'
									})
									.populate('addedBy', 'name email phone')
									.exec()
		return {
			status: 200,
			entity: {
				success: true,
				destinations: destinations.map(destination => role == 'admin' ? destination.view(true) : destination.view())
			}
		}
	}catch(error){
		console.log(error)
		return {
			status: 400,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const show = async ({ id }, { role }) => {
	try{
		const destination = await Destination
								.findById(id)
								.populate('addedBy', 'name email phone')
								.exec()
		return {
			status: 200,
			entity: {
				success: true,
				destination: role == 'admin' ? destination.view(true) : destination.view()
			}
		}
	}catch(error){
		console.log(error)
		return {
			status: 400,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const create = async ( body, { _id, role} ) => {
	try{
		body.addedBy = _id
		const destination = await Destination.create(body)
		if(destination._id){
			return {
				status: 200,
				entity: {
					success: true,
					destination: role == 'admin' ? destination.view(true) : destination.view()
				}
			}
		}
		return {
			status: 400,
			entity: {
				success: false,
				error: 'Invalid parameters.'
			}
		}
	}catch(error){
		return {
			status: 409,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const update = async ({ id }, body, { role }) => {
	try {
		const destination = await Destination.findById(id)
		if(destination._id){
			const updateResponse = await Object.assign(destination, body).save()
			if(updateResponse._id){
				return {
					status: 200,
					entity: {
						success: true,
						destination: role == 'admin' ? updateResponse.view(true) : updateResponse.view()
					}
				}
			}			
		}
		return {
			status: 400,
			entity: {
				success: false,
				error: 'Invalid parameters.'
			}
		}
	}catch(error){
		return {
			status: 409,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const remove = async ({ id }, { role }) => {
	try {
		const destination = await Destination.findById(id)
		if(destination._id){
			const removed = await destination.remove()
			if(removed){
				return {
					status: 200,
					entity: {
						success: true,
					}
				}
			}
		}
		return {
			status: 400,
			entity: {
				success: false,
				error: 'Invalid parameters.'
			}
		}
	}catch(error){
		console.log(error)
		return {
			status: 409,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}