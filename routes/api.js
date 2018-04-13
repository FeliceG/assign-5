var express = require('express');
var router = express.Router();
var api = require('../controllers/apiController');

router.use((req, res, next)=>{
   res.set({
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
     'Content-type': 'application/json'
   });
   if(req.method === 'OPTIONS'){
     return res.status(200).end();
   }
   next();
 });
// list
router.get('/list', api.list);

// find
router.get('/student/:studentid', api.read);

//create
router.post('/create', api.create);

router.put('/update/:studentid', api.update);

router.delete('/delete/:studentid', api.delete);

// export our router
module.exports = router;
