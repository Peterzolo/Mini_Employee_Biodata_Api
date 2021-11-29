const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true  
			// unique: true
		},
		phone: {
			type: String
		},
		position: {
			type: String
		},
		gender: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String
		},
		picture: {
			type: String,
			required: true
		},
		startDate: {
			type: String,
			required: true
		}
	},
	{ timeStamp: true }
);

const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;
