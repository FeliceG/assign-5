var studentService = require('../services/studentService');

var ApiController = {};

// List the students on the roster
ApiController.list = (req, res)=>{
  studentService.list({})
    .then((students)=>{
      if (students) {
        res.json(students);
      } else {
        res.end('No students found.');
      }
    }).catch((err)=>{
        res.end('Listing Students error.');
   });
};


// Read one student by id in an edit form
ApiController.read = (req, res)=>{
  studentService.read({_id: req.params.studentid})
    .then((student)=>{
      res.json(student);
    })
    .catch((err)=>{
    res.end('Reading Student error.');
  });
};

// Create a student record
ApiController.create =  (req, res)=>{
  studentService.create({
    first: req.body.first,
    last: req.body.last,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  }).then((s)=>{
     res.json(s);
   }).catch((err)=>{
      res.end('Creating Student error.');
   });
};

// Update one student's record based on student id
ApiController.update = (req, res)=>{
  let putdata = req.body;
  studentService.update(req.params.studentid, putdata)
    .then((updatedStudent)=>{
        res.json(updatedStudent);
    }).catch((err)=>{
        res.end('Updating student error.');
    });
};

// Delete the specific student based on student id
ApiController.delete = (req, res) => {
  studentService.delete(req.params.studentid)
  .then((student)=>{
    res.json(student);
  }).catch((err)=>{
    res.end('Deleting Student error.');
  });
};

module.exports = ApiController;
