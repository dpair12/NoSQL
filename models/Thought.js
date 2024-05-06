const { Schema, model } = require('mongoose');
//Reaction Structure
const reactionSchema = new Schema ({
reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
reactionBody: {type: String, required: true, maxlength: 280},
username: {type: String, required: true},
createdAt: {type: Date, default: Date.now, get: (date) => date.toLocaleString()},
},
{
toJSON: {
getters: true,
},
id: false,
});



//Thought Model structure
const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: (date) => date.toLocaleString()},
  username: { type: String, required: true },
  reactions: [reactionSchema],
}, {
  toJSON: { virtuals: true, getters: true },
  id: false,
});

ThoughtSchema
.virtual('reactionCount')
.get(function () {
 return this.reactions.length;
})

const Thought = model('thought', ThoughtSchema);


module.exports = Thought; 