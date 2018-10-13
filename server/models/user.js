const mongoose=require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname:{type:String},
  lastname:{type:String},
  mobile:{type:Number},
  password:{type:String},
  lastLogin:{type:Date}
});

UserSchema.pre('save',function (next) {
const users=this,
  SALT_FACTOR=5;
if(!users.isModified('password')) return next();
  bcrypt.genSalt(SALT_FACTOR,function (err , salt) {
    if(err) return next(err);

    bcrypt.hash(users.password,salt,null,function (err,hash) {
      if(err){
        return next(err);
      }
      users.password=hash;
      next();
    });
  });
});

UserSchema.methods.comparePasswod=function (candidatePassword,cb) {
  bcrypt.compare(candidatePassword,this.password,function (err,isMatch) {
    if(err){
      return cb(err)
    }
      cb(null,isMatch);
  })
};
module.exports=mongoose.model('users',UserSchema,'users');
