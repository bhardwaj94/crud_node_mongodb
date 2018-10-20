const Person = require('../models/person.model.js');

// Create and Save a new Person
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Person content can not be empty"
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name || "Untitled Person", 
        age: req.body.age,
        notes:req.body.notes
    });

    // Save Person in the database
    person.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Person."
        });
    });
};


// Retrieve and return all Persons from the database.
exports.findAll = (req, res) => {
    Person.find().populate('notes')
    .then(persons => {
        res.send(persons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Persons."
        });
    });
};