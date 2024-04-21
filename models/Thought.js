const { ObjectId } = require('mongoose');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema ({
reactionId: {type: Schema.Types.ObjectId, default: new ObjectId},
reactionBody: {type: String, required: true, maxlength: 280},
username: {type: String, required: true},
createdAt: {type: Date, default: Date.now},
});


reactionSchema
.virtual('formatcreatedAt')
//Getter method to format timestamp for createdAt on query
.get(function () {
return this.createdAt.toDateString();
});


const ThoughtSchema = new Schema ({
 thoughtText: {type: String, required: true, minlength: 1, maxlength:280},
 createdAt: {type: Date, default: Date.now,  },
 username: {type: String, required: true},
 reactions: [reactionSchema],
});

ThoughtSchema
.virtual('reactionCount')
.get(function () {
const reactions = this.reactions.length;
const date = this.createdAt.toDateString();
return reactions, date;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 