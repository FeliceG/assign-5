var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
   first: {type: String, required: true},
   last: {type: String, required: true},
   address: {type: String, required: true},
   city: {type: String, required: true},
   state: {type: String, required: true}
});

module.exports = mongoose.model("Student", Schema);
