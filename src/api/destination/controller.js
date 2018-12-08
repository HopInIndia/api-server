import { jwtSign, jwtVerify } from '../../services/jwt/'
import { Destination } from './model'

export const list = async ({ offset, limit, type, searchTerm}) => {
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
		.exec()
		return {
			status: 200,
			entity: {
				success: true,
				destinations: destinations
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

export const create = async ( body, user ) => {
	try{
		body.addedBy = user._id
		const destination = await Destination.create(body)
		if(destination._id){
			return {
				status: 200,
				entity: {
					success: true,
					destination: destination
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