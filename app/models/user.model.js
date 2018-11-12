var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  email: {
    type: String},
  username: {
    type: String},
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
  },{
    timestamps: true
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.methods.cmpPwd=function(password,callback){
  bcrypt.compare(password,this.password,function(err,isMatch){
    if (err) return callback(err);
    callback(null,isMatch);
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;