import mongoose, { Schema } from 'mongoose'

const type = ['SCHOOL', 'OFFICE', 'COLLEGE']

const destinationSchema = new Schema({
	type: {
		type: String,
		enum: type,
		required: true,
		trim: true,
	},
	name: { type: String, required: true, trim: true },
	address: {
		address1: { type: String, required: true },
		address2: { type: String },
		district: { type: String, required: true },
		state: { type: String, required: true },
		zipCode: { type: Number, required: true },
	},
	email: [{ type: String, match: /^\S+@\S+\.\S+$/, trim: true }],
	phone: [{ type: String, match: /^(\d{10})$/ }],
	locaton: {
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
	},
	addedBy: { type: String, ref: 'User', required: true }
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform: (obj, ret) => { delete ret._id }
	}
})

export const Destination = mongoose.model('Destination', destinationSchema)
