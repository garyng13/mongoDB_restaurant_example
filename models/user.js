var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportMongooseLocal = require('passport-local-mongoose');


var User = new Schema({
  
    admin:{
        type: Boolean,
        default: false
    }

})

User.plugin(passportMongooseLocal);
module.exports = mongoose.model("User", User);