var studentService = require('../services/studentService');

//Create the controller
var StudentController = {};

console.log('in studentController.js just before get.');
// List the students on the roster
StudentController.list = (req, res)=>{
  studentService.list({})
    .then((students)=>{
      res.render('students', {title: "Student Roster", students: students});
    }).catch((err)=>{
        res.end('Listing Students error.');
   });
};

console.log('in studentController..js just before get/read.');
// Read one student by id in an edit form
StudentController.read = (req, res)=>{
  studentService.read({_id: req.params.studentid})
    .then((student)=>{
      res.render('edit_student', {title: "Student Roster", student: student});
    })
    .catch((err)=>{
    res.end('Reading Student error.');
  });
};

console.log('in studentController..js just before post.');
// Create a student record
StudentController.create = (req, res)=>{
  studentService.create({
    first: req.body.first,
    last: req.body.last,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  })
  .then((s)=>{
     res.redirect('/students');
   }).catch((err)=>{
      res.end('Creating Student error.');
   });
};

// Update one student's record based on student id
StudentController.update = (req, res)=>{
  studentService.update(
    req.params.studentid,
    {
        first: req.body.first,
        last: req.body.last,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state
      }
    )
    .then((student)=>{
        res.redirect('/students');
    }).catch((err)=>{
        res.end('Updating student error.');
    });
};

// Delete the specific student based on student id
StudentController.delete = (req, res) => {
  studentService.delete(req.params.studentid)
  .then((student)=>{
    res.redirect('/students');
  }).catch((err)=>{
    res.end('Deleting Student error.');
  });
};

module.exports = StudentController;
