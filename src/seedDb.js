import { User } from './api/user/model'

export const createAdmin = async () => {
	const adminData = {
		"name": {
			"firstName": "Pratik",
			"lastName": "Raj"
		},
		"email": "pratikraj26@gmail.com",
		"phone": 9599226023,
		"password": "password",
		"role": "admin",
		"username": "pratikraj",
		"slugName": "pratikraj"
	}
	try{
		const admin = await User
		.findOne({
			"phone": 9599226023
		})
		.exec()
		if(!admin){
			const admin = await createNewUser(adminData)
			if(admin){
				return admin
			}
			return null
		}
		return admin	
	}catch(error){
		return null
	}
}

const createNewUser = async (userData) => {
	const newUser = await User.create(userData)
	if(!newUser){
		return null
	}
	return newUser
}