module.exports = (route) => {
    const person = require('../controllers/person.controller.js');
    
    // Create a new Person
    route.post('/p', person.create);

    // Retrieve all Persons
    route.get('/g', person.findAll);


}