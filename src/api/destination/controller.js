import { jwtSign, jwtVerify } from '../../services/jwt/'
import { Destination } from './model'

export const list = async ({ page, limit}) => {
	try{
		return {
			status: 200,
			entity: {
				success: true,
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