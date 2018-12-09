import { jwtSign, jwtVerify } from '../../services/jwt/'
import { Vehicle } from './model'

export const list = async ({ offset, limit, userId}, { role }) => {
	try{

		let params = {}
		if(userId){
			params.addedBy = userId
		}
		const vehicles = await Vehicle
								.find(params)
								.limit(limit || 10)
								.skip(offset || 0)
								.sort({
									timestamps: 'desc'
								})
								.populate('addedBy', 'name email phone')
								.populate('assignedTo', 'name email phone')
								.exec()
		return {
			status: 200,
			entity: {
				success: true,
				vehicles: vehicles.map(vehicle => role == 'admin' ? vehicle.view(true) : vehicle.view())
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
		const vehicle = await Vehicle
								.findById(id)
								.populate('addedBy', 'name email phone')
								.populate('assignedTo', 'name email phone')
								.exec()
		return {
			status: 200,
			entity: {
				success: true,
				vehicle: role == 'admin' ? vehicle.view(true) : vehicle.view()
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

export const create = async ( body, { _id, role } ) => {
	try{
		body.addedBy = _id
		const vehicle = await Vehicle.create(body)
		if(vehicle._id){
			return {
				status: 200,
				entity: {
					success: true,
					vehicle: role == 'admin' ? vehicle.view(true) : vehicle.view()
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
		const vehicle = await Vehicle.findById(id)
		if(vehicle._id){
			const updateResponse = await Object.assign(vehicle, body).save()
			if(updateResponse._id){
				return {
					status: 200,
					entity: {
						success: true,
						vehicle: role == 'admin' ? updateResponse.view(true) : updateResponse.view()
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
		const vehicle = await Vehicle.findById(id)
		if(vehicle._id){
			const removed = await vehicle.remove()
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