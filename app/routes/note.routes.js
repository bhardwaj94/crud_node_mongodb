module.exports = (route) => {
    const notes = require('../controllers/note.controller.js');
    
    // Create a new Note
    route.post('/', notes.create);

    // Retrieve all Notes
    //app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    route.get('/:noteId', notes.findOne);

    route.get('/withPaginate/:page', notes.findAll);

    // Update a Note with noteId
    route.put('/:noteId', notes.update);

    // Delete a Note with noteId
    route.delete('/:noteId', notes.delete);

}