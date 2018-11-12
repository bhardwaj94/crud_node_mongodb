const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const NoteSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String
}, {
    timestamps: true
});

NoteSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Note', NoteSchema);