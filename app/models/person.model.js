const mongoose = require('mongoose');
//const Note = require('../models/note.model.js');

var personSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
  },{
    timestamps: true
});

module.exports = mongoose.model('Person', personSchema);