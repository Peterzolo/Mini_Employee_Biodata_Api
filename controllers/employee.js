const Employee = require('../models/Employee');

exports.createEmployeeData = async (req, res) => {
	const { firstName, lastName, email, phone, position, gender, state, country, picture, startDate } = req.body;

	try {
		const existingEmployeeData = await Employee.findOne({ email });
		if (existingEmployeeData) res.status(400).send({ message: 'Employee data already taken' });

		const newEmployeeData = await new Employee({
			firstName,
			lastName,
			email,
			phone,
			position,
			gender,
			state,
			country,
			picture,
			startDate
		});
		const savedEmployeeData = await newEmployeeData.save();
		res.status(200).send({ success: savedEmployeeData });
	} catch (error) {
		res.status(500).send({error});
	}
};

exports.fetchEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		if (employees.length < 1) res.status(404).json({ Not_found: 'No employee found' });
		res.status(201).send({ Success: employees });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.fetchSingleEmployee = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee) res.status(404).json({ Not_found: 'Could not find employee by that Id' });
		res.status(201).send({ Success: employee });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.deleteEmployeeData = async (req, res) => {
	try {
		const employee = await Employee.findByIdAndDelete(req.params.id);
		// if (!employee) res.status(404).json({ Not_found: 'Could not find employee by that Id' });

		res.status(201).send({ Success: 'Employee Successfully removed' });
	} catch (error) {
		res.status(500).send(error);
	}
};  

exports.updateEmployeeData = async (req, res) => {
	const { firstName, lastName, email, phone, position, gender, state, country, picture, startDate } = req.body;

	try {
		const updateData = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.status(202).send({ Success: updateData });
	} catch (error) {
		res.status(500).send(error);
	}
};
