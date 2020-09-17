var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');



router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res,next)=>{
  User.register(new User({username:req.body.username}),req.body.password, (err,user)=>{
    if(err){
      res.statusCode = 501;
      res.setHeader("Content-Type", "application/json");
      res.json({err: err});
    }
    else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode =200;
        res.setHeader("Content-Type","application/json");
        res.json({status: "registration successfully", sucess: true});
      });
    }
  })
})


router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader("Content-Type","applicaion/json");
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
}
)

router.get('/logout', (req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("you are not logged in");
  }
})
module.exports = router;