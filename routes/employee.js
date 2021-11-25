const express = require('express');
const { createEmployeeData, fetchEmployees, fetchSingleEmployee, deleteEmployeeData } = require('../controllers/employee');

const router = express.Router();

router.route('/').post(createEmployeeData);
router.route('/').get(fetchEmployees);
router.route('/:id').get(fetchSingleEmployee);
router.route('/:id').delete(deleteEmployeeData);

module.exports = router;
