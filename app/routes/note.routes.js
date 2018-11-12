module.exports = (route) => {
    const notes = require('../controllers/note.controller.js');
    
    // Create a new Note
    route.get('/',(req,res)=>{
        console.log(req.session.userId);
        res.sendFile('G:/projects/node-mongo_crud/app/view/user.html');
    });
    route.post('/', notes.create);

    // Retrieve all Notes
    //app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    route.get('/:noteId', notes.findOne);

    route.get('/page/:page', notes.findAll);

    // Update a Note with noteId
    route.put('/:noteId', notes.update);

    // Delete a Note with noteId
    route.delete('/:noteId', notes.delete);

}