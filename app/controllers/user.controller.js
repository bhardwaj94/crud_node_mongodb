const User = require('../models/user.model.js');
const Note = require('../models/note.model.js');

const users = [{firstN:"ram",lastN:"kumar"},
                {firstN:"Jake",lastN:"sanga"},
                {firstN:"blade",lastN:"sanga"}];
console.log(users);
exports.signup = (req, res) => {
    //destructuring req.body
    const {username,email, password, passwordConf,notes } = req.body
    // Validate request
    if (password !== passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
      }

    if(!(email &&
        username &&
        password &&
        passwordConf)) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    var userData = new User({
        email: email,
        username: username,
        password: password,
        notes: notes,
      });

    // Save Person in the database
    userData.save()
    .then(data => {
        res.sendFile('G:/projects/node-mongo_crud/app/view/login.html');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.login = (req, res) => {
    const {username, password} = req.body
    if (username && password){
              User.findOne({username},function(err,user){
              if (err||!user) throw err;
              user.cmpPwd(password,function(err,isMatch){
                if (err) throw err;
                console.log('Password:'+isMatch);
                req.session.userId = user._id;
                console.log('req.session',req.session);
                req.flash('info', 'Successfully logged in!!')
                //res.send("Successfully logged in...and user is"+req.session.userId);
                res.redirect('/dashboard');
                //return res.send("Successfully logged in...and user is"+req.session.userId);
              });
          })
    }
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }

};

exports.findAll=(req,res)=>{
    console.log(req.session.userId)
    User.findById(req.session.userId).populate('notes')
    .then(user=>{
        console.log('cookies'+req.body.cookies+'users'+user)
         res.render('dashboard',{username:user.username,notes:user.notes,messages: req.flash('info')});
    })
    .catch(err=>{
        console.log(err);
        return res.redirect('/');
    })

}



exports.logout=(req,res)=>{

    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            return next(err);
          } else {
            return res.sendFile('G:/projects/node-mongo_crud/app/view/login.html');
          }
        });
      }

}