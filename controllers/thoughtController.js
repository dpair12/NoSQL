const { Thought, User } = require('../models');

module.exports = {
async getThoughts (req, res) {
try {
const thoughts = await Thought.find().populate({path: 'username', select: '-__v'}, {path: 'reactions', select: '-__v'});
res.json(thoughts);
} catch (err) {
res.status(500).json(err);
}
},

async getSingleThought (req, res) {
try {
const singlethought = await Thought.findOne({_id: req.params.userId})
.populate({path: 'username', select: '-__v'}, {path: 'reactions', select: '-__v'});
if (!singlethought) {
return res.status(400).json({message: 'No thought found with that id.'});
}
} catch (err) {
res.status(500).json(err);
}
},

async CreateThought (req, res) {
try {
const createthought = await Thought.create(req.body);
const user = await User.findOneAndUpdate(
{ _id: req.body.userId },
{ $addToSet: { thoughts: createthought._id } },
{ new: true }
);
if (!user) {
return res.status(404).json({message: 'Thought created, but found no user with that ID.'});
}

res.json('Thought successfully created!');
} catch (err) {
res.status(500).json(err);
}
},

async UpdateThought (req, res) {
try {
const updatethought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId},
{ $set: req.body},
{ runValidators: true, new: true }
);

if (!updatethought) {
return res.status(404).json({message: 'No thought exists with this ID!'});
}

res.json(thought);
} catch (err) {
res.status(500).json(err);
}
},

async DeleteThought (req, res) {
try {
const deletethought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

if (!deletethought) {
return res.status(404).json({message: 'No thought with this ID!'});
}

const user = await User.findOneAndUpdate(
{ thoughts: req.params.thoughtId},
{ $pull: { thoughts: req.params.thoughtId } },
{ new: true}
);

if (!user) {
return res.status(404).json({message: 'This thought is not associated with this user and cannot be deleted.'});
}

res.json({message: 'Thought successfully deleted!'});
} catch (err) {
res.status(500).json(err);
}
},

async AddReaction (req, res) {
try {
const thought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $addToSet: { reactions: req.body } },
{ runValidators: true, new: true }
);

if (!thought) {
return res.status(404).json({ message: 'Cannot find thought with this id to add a reaction to.'});
}

res.json(thought);
} catch (err) {
res.status(500).json(err);
}
},

async DeleteReaction (req, res) {
try {
const thought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $pull: { reactions: { reactionId: req.params.reactionId} } },
{ runValidators: true, new: true }
);

if (!thought) {
return res.status(404).json({message: 'Cannot delete thought because there is no thought that exists with that ID.'});
}

res.json(thought);
} catch (err) {
res.status(500).json(err);
}
}
}