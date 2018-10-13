var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
var User=require('../models/user');
var config=require('../config');

exports.signup=function (req,res,next) {
 const firstname=req.body.firstname;
 const lastname=req.body.lastname;
 const mobile=req.body.mobile;
 const password=req.body.password;
 if(!firstname || !lastname || !mobile || !password){
   res.status(422).json({
     success:false,
     message:'Posted data is not correct or incomplete.'
   });
 }
 User.findOne({mobile:mobile},function (err,existingUser) {
   if(err){
     res.status(400).json({
       success:false,
       message:'Error Processing Request'+err
     })
   }
  if(existingUser){
     res.status(201).json({
       success:false,
       message:'mobile already exist'
     })
  }
  let oUser=new User({
    firstname:firstname,
    lastname:lastname,
    mobile:mobile,
    password:password
  })
   oUser.save(function (err,oUser) {
if(err){
  res.status(400).json({
    success:false,
    message:'Error processing Request'+err
  });
}
res.status(200).json({
  success:true,
  message:'User successfully inserted please login to your account'
     });
   });
 });
};

exports.login=function (req,res,next) {
  User.findOne({mobile:req.body.mobile},function (err,user) {
    if(err){
      res.status(400).json({
        success:false,
        message:'Error Processing Request'+err
      })
    }
    if(!user){
      res.status(201).json({
        success:false,
        message:'Incorrect Login Credentials'
      })
    }else if (user){
      user.comparePasswod(req.body.password,function (err,isMatch) {
        if(isMatch &&  !err){
          var token=jwt.sign(user,config.secret,{expireIn:config.tokenexp})
        }
      });

      let last_login=user.lastlogin;
      user.lastlogin=new Date();

      user.save(function (err) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

        res.status(201).json({
          success:true,
          message:{'user_id':user._id,'firstname':user.firstname,'last_login':user.lastlogin},
          token:token
        });
      });
    }else{
      res.status(201).json({
        success:false,
        message:'Incorrect Login Credentials'
      })
    }
  })
};

exports.authenicate=function (req,res,next) {
  var token=req.body.token || req.query.token || req.headers['authorization'];
  if(token){
    jwt.verify(token,config.secret,function (err,decoded) {
      if(err){
        return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
      }else{
        req.decoded=decoded;
        next();
      }
    });
  }else{
    return res.status(201).json({
      success:false,
      message:'Fatal error, Authenticate token not available.',
      errcode:'no-token'
    });
  }
};

