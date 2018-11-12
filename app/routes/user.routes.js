module.exports = (route) => {
    const user = require('../controllers/user.controller.js');
    
    // Create a new user
    route.get('/signUp',(req,res)=>{
        console.log("from signUp")
        res.sendFile('G:/projects/node-mongo_crud/app/view/register.html');
    });
    route.post('/signUp', user.signup);

    // login a user
    route.get('/logIn',(req,res)=>{
        console.log("from login")
        res.sendFile('G:/projects/node-mongo_crud/app/view/login.html');
    });
    route.post('/logIn',user.login);

    // Retrieve all user
    route.get('/dashboard', user.findAll);
    route.get('/logout', user.logout);
    route.use('/dashboard/notes',route);

    require('../routes/note.routes.js')(route);
    
}