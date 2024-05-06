const { Thought, User } = require('../models');

module.exports = {
//Get All Thoughts
async getThoughts (req, res) {
try {
const thoughts = await Thought.find().select('-__v');
res.json(thoughts);
} catch (err) {
res.status(500).json(err);
}
},

//Get Single Thought By ID
async getSingleThought (req, res) {
try {
const singlethought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
if (!singlethought) {
return res.status(400).json({message: 'No thought found with that id.'});
}
res.json(singlethought);
} catch (err) {
res.status(500).json(err);
}
},


//Create Thought 
async CreateThought(req, res) {
    try {
      const createthought = await Thought.create(req.body);
  
      // Find the user by ID and add the newly created thought's _id to the user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: createthought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Thought created, but no user found with that ID.' });
      }
  
      res.json(createthought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//Update Thought
async UpdateThought (req, res) {
try {
const updatethought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId},
{ thoughtText: req.body.thoughtText}
);

if (!updatethought) {
return res.status(404).json({message: 'No thought exists with this ID!'});
}

res.json({message: `Succesfully updated ${updatethought.username}'s thought!`});
} catch (err) {
res.status(500).json(err);
}
},
//Delete Thought
async DeleteThought (req, res) {
try {
const thought = await Thought.findOne({_id: req.params.thoughtId});

if (!thought) {
return res.status(404).json({message: 'No thought with this ID!'});
}

await User.findOneAndUpdate(
{ username: thought.username},
{$pull: {thoughts: req.params.thoughtId} }
);

await Thought.findOneAndRemove({_id: req.params.thoughtId});

res.json({message: `Thought ${req.params.thoughtId} successfully deleted and removed from ${thought.username}'s thought list!`});
} catch (err) {
res.status(500).json(err);
}
},

//Add Reaction
async AddReaction (req, res) {
try {
const reaction = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $addToSet: { reactions: req.body} }
);

if (!reaction) {
return res.status(404).json({ message: 'Cannot find thought with this id to add a reaction to.'});
}

const id = req.params.thoughtId;
const username = req.params.username;

res.json({message: `Successfully updated thought #${id} with a reaction!`});
} catch (err) {
res.status(500).json(err);
}
},

//Delete Reaction
async DeleteReaction (req, res) {
try {
const thought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $pull: { reactions: req.params.reactionId } }
);

const thoughtid = req.params.thoughtId;
const id = req.params.reactionId;
if (!thought) {
return res.status(404).json({message: 'Cannot delete thought because there is no thought that exists with that ID.'});
}

res.json({message: `Successfully deleted Reaction #${id} from thought #${thoughtid}`});
} catch (err) {
res.status(500).json(err);
}
}
}