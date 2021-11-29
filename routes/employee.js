const express = require('express');
const {
	createEmployeeData,
	fetchEmployees,
	fetchSingleEmployee,
	deleteEmployeeData,
	updateEmployeeData
} = require('../controllers/employee');

const router = express.Router();

router.route('/').post(createEmployeeData);
router.route('/').get(fetchEmployees);
router.route('/:id').get(fetchSingleEmployee);
router.route('/:id').delete(deleteEmployeeData);
router.route('/:id').put(updateEmployeeData);

module.exports = router;
