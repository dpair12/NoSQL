const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { thoughtss, userdata, reactions } = require('./data.js');


connection.on('error', (err) => console.error(err));
connection.once('open', async () => {
  console.log('Connected to the database');


  try {
    // Drop collections if they exist
    await connection.dropCollection('users');
    await connection.dropCollection('thoughts');

    // Get a random item given an array
const getRandomArrItem = (arr) => Math.floor(Math.random() * arr.length);

// Gets a random username
const getRandomUserName = () => userdata[getRandomArrItem(userdata)].username;

const getRandomReaction = (count) => {
  const randomReactions = [];
  for (let i = 0; i < count; i++) {
    const randomReaction = reactions[getRandomArrItem(reactions)];
    randomReactions.push({
      reactionBody: randomReaction.reactionBody,
      username: getRandomUserName()
    });
  }
  return randomReactions;
};

const thoughtz = thoughtss.map((content) => {
  let thought = {};
  thought.thoughtText = content;
  thought.username = getRandomUserName();
  thought.reactions = getRandomReaction(3);
  return thought;
});

const userz = userdata.map((user) => {
  let emptyobj1 = {};
  emptyobj1.username = user.username;
  emptyobj1.email = user.email;
  emptyobj1.thoughts = [];
  emptyobj1.friends = [];
  return emptyobj1;
});


    // Insert users and thoughts
    await User.collection.insertMany(userz);
    await Thought.collection.insertMany(thoughtz);

  

    // Fetch all users from the database
    const users = await User.find();

    // Update the friends array for each user
    for (const user of users) {
      const randomFriends = users
        .filter((u) => u.username !== user.username)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((u) => u._id);

      user.friends = randomFriends;
      await user.save();
    }

 
// Find thoughts for each user and update their profile
// Find thoughts for each user and update their profile
for (const user of users) {
  const userThoughts = await Thought.find({ username: user.username });
  const thoughtIds = userThoughts.map((thought) => thought._id); // Get only the thought ids
  
  user.thoughts = thoughtIds; // Assign an array of thought ids to the user's thoughts
  await user.save();
}


  } catch (error) {
    console.error(`An error occurred: ${error}`);
  } finally {
    console.info('Seeding complete! 🌱');
    process.exit(0);
  }
});
