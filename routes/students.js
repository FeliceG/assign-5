var express = require('express');
var students = require('../controllers/studentController');
var router = express.Router();

// List the students on the roster
router.get('/', students.list);

// Create a student record
router.post('/create', students.create);

// Read one student by id in an edit form
router.get('/:studentid', students.read);

// Update one student's record based on student id
router.post('/update/:studentid', students.update);

// Delete the specific student based on student id
router.get('/delete/:studentid', students.delete);

module.exports = router;
