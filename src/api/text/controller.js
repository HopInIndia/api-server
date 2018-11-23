import { jwtSign, jwtVerify } from '../../services/jwt/'
import { otpExpiresIn } from '../../config'
import { Text } from './model'

export const sendMessage = async (body, res, callback) => {
	try{
		const response = await Text.create(body)
		if(response._id){
			return {
				status: 200,
				entity: {
					success: true,
					...response
				}
			}
		}
		return {
			status: 400,
			entity: {
				success: false,
				error: 'Invalid Parameters'
			}
		}
	}catch(error){
		return {
			status: 400,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const sendVerificationCode = async ( { phone, message, verificationCode} ) => {
	try{
		const response = await sendMessage({ phone, message, verificationCode })
		if(response.status === 200){
			return {
				status: 200,
				entity: {
					success: true,
					verificationToken: jwtSign({phone, verificationCode}, {expiresIn: otpExpiresIn})
				}
			}
		}
		return response
	}catch(error){
		return {
			status: 400,
			entity: {
				success: false,
				error: error.errors || error
			}
		}
	}
}

export const verifyVerificationCode = async ( { phone, verificationCode, verificationToken } ) => {
	try{
		const decodedToken = jwtVerify(verificationToken)
		if(decodedToken.phone == phone && decodedToken.verificationCode == verificationCode){
			return {
				status: 200,
				entity: {
					success: true,
					signUpToken: jwtSign({ phone }, { expiresIn: otpExpiresIn })
				}
			}			
		}
		return {
			status: 400,
			entity: {
				success: false,
				error: 'Invalid verification code.'
			}
		}
	}catch(error){
		return {
			status: 400,
			entity: {
				success: false,
				error: error.name == 'TokenExpiredError' ? 'OTP has expired.' : 'Invalid verification code.'
			}
		}
	}
}
