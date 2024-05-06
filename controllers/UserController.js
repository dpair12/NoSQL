const { User, Thought } = require('../models');

module.exports = {

//Get All Users with Associated Thoughts and Friends
async getUsers (req, res) {
try {
const users = await User.find().select('-__v').populate({
    path: 'thoughts'
  });
res.json(users);
} catch (err) {
res.status(500).json({message: `${err}`});
}
},

//Get a Single User by their ID with Associated Thoughts and Friends
async getSingleUser (req, res) {
try {
const user = await User.findOne({ _id: req.params.userId}).select('-__v').populate({
    path: 'thoughts'
  });
if (!user) {
return res.status(400).json({message: 'No user found with that id.'});
}
res.json(user);
} catch (err) {
res.status(500).json(err);
}
},

//Create a User
async createUser (req, res) {
try {
const user = await User.create(req.body);
res.json(user);
} catch (err) {
res.status(500).json(err);
}
},

//Update a User By Their ID
async UpdateUser (req, res) {
try {
const updateuser = await User.findOneAndUpdate(
{ _id: req.params.userId },
{ $set: req.body },
{ runValidators: true, new: true }
);
if (updateuser.username) {
await Thought.findOneAndUpdate(
{_id: {$in: updateuser.thoughts }},
{username: updateuser.username});
}
const id = req.params.userId;

if (!updateuser) {
res.status(404).json({message: `Unable to update user information for User ID #${id}.`})
}

res.status(200).json({message: `Successfully updated User ID#${id} information!`});
} catch (err) {
res.status(500).json(err);
}
},

async DeleteUser (req, res) {
try {
const user = await User.findOneAndRemove({_id: req.params.userId});
if (!user) {
return res.status(404).json({message: 'Cannot delete user because they do not exist.'});
}
await Thought.deleteMany({_id: user.thoughts});

res.json(user);
} catch (err) {
res.status(500).json(err);
}
},

//Add a Friend to User's Friend List
async addFriend (req, res) {
try {
const findUser = await User.findOne(
{ _id: req.params.userId }
);

if (!findUser) {
return res.status(404).json({message: 'Cannot add friend to list becuase user does not exist'});
}

if (findUser.friends.includes(req.body.friendId)) {
return res.json({message: `Friend is already a part of this user's friend list.`});
}

const user = await User.findOneAndUpdate(
{ _id: req.params.userId },
{ $addToSet: {friends: req.body.friendId} },
{ new: true }
);


res.json(user);
} catch (err) {
res.status(500).json(err);
}
},

async DeleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );

      const friendId = req.params.friendId;
  
      if (!user) {
        return res.status(404).json({ message: 'Unable to delete friend because user does not exist.' });
      }
  
      res.json({message: `Successfully deleted ${friendId} from ${user.username}'s friend list!`});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};