import mongoose, { Schema } from 'mongoose'

const status = ['ACTIVE', 'INACTIVE', 'DELETED']

const vehicleSchema = new Schema({
	make: { type: String, required: true, trim: true },
	model: { type: String, required: true, trim: true },
	color: { type: String, required: true, trim: true },
	registrationNumber: { type: String, required: true, trim: true, unique: true },
	assignedTo: { type: String, ref: 'User', default: null },
	addedBy: { type: String, ref: 'User', required: true },
	status: { type: String, enum: status, default: 'INACTIVE', required: true },
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform: (obj, ret) => { delete ret._id }
	}
})

vehicleSchema.methods = {
	view (full) {
		let view = {}
		let fields = ['_id', 'make', 'model', 'color', 'registrationNumber']

		if (full) {
			fields = [...fields, 'assignedTo', 'addedBy', 'createdAt', 'updatedAt']
		}

		fields.forEach((field) => { view[field] = this[field] })

		return view
	},
}

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)
