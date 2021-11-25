const Employee = require('../models/Employee');

exports.createEmployeeData = async (req, res) => {
	const { firstName, lastName, email, phone, position, gender, state, country, picture, startDate } = req.body;

	try {
		const existingEmployeeData = await Employee.findOne({ email });
		if (existingEmployeeData) res.status(400).json({ message: 'Employee data already taken' });

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
		res.status(200).json({ success: savedEmployeeData });
	} catch (error) {
		res.status(500).json({ error: 'Could not save employee data' });
	}
	s;
};

exports.fetchEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		if (employees.length < 1) res.status(404).json({ Not_found: 'No employee found' });
		res.status(201).json({ Success: employees });
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch employees data' });
	}
};

exports.fetchSingleEmployee = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		// if (!employee) res.status(404).json({ Not_found: 'Could not find employee by that Id' });
		res.status(201).json({ Success: employee });
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch employees data' });
	}
};

exports.deleteEmployeeData = async (req, res) => {
	try {  
		const employee = await Employee.findByIdAndDelete(req.params.id);
        // if (!employee) res.status(404).json({ Not_found: 'Could not find employee by that Id' });

		res.status(201).json({ Success: 'Employee Successfully removed' });
	} catch (error) {
		res.status(500).json({ error: 'Could not remove employees data' });
	}
};


exports.updateEmployeeData = () =>{
    const { firstName, lastName, email, phone, position, gender, state, country, picture, startDate } = req.body;

    try {
        const updateData = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
          );
          res.status(202).json({Success : updateData})
    } catch (error) {
        res.status(500).json({ error: 'Could not update employees data' });

    }

}
