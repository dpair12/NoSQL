const usernames = [
'MaryJonesdabomb2',
'Bob_Riley1988',
'SarahClive4Real',
'PeterGriffin_01',
'JakeAr39',
'ApplevSamsung',
'Sweetpie',
'ActivisionSucks',
];

const emails = [
'appleuser123@gmail.com',
'waterisgood@yahoo.com',
'myexample@example.com',
'testemail@testme.com',
'powerwithin@power.com',
'codingwarrior@hotmail.com',
'proofimreal@testrecord.com',
'gettingtired@sleepy.com'
];

const thoughtss = [
'Jordan is not a better basketball player than Lebron.',
'Pizza Hut is the most overrated franchise in America.',
'Its a very nice day here in Sacramento.',
'Hope everyone is having a great day!',
'I think it would be cool if the Earth had slightly less gravity on it.',
'Resident Evil 4 Remake final boss is too hard, I think I am never going to finish this game.',
'Driving Teslas are fun but it is not the best ev out there.',
'If 1 + 1 = 2 and 2 + 2 = 4, then why does 3 + 3 not equal 7?'
];

const reactions = [
'Great Post!',
'I completely agree with you!',
'Is it possible to get more context on what youre talking about?',
'Another great post!',
'How do I submit a reaction?',
'Keep giving it all you got!',
'Nice thought!',
'I never considered that from that perspective.'
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//Gets a random username
const getRandomUserName = () => `${getRandomArrItem(usernames)}`;

const getRandomThoughts = () => `${getRandomArrItem(thoughtss)}`;

//Gets a random email
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

const getRandomReactions = () => `${getRandomReactions(reactions)}`;

//Gets random user data based on user model

const users = usernames.map((user) => {
const userobj = {};
userobj.username = user;
userobj.email = getRandomEmail();
userobj.thoughts = [];
userobj.friends = [];
const friends = getRandomUserName(3);
const thoughts = getRandomThoughts(3);

for (const friend of friends) {
const friendsobj = {};
friendsobj.username = friend;
userobj.friends.push(friendsobj);
}

for (const thought of thoughts) {
const thoughtsobj = {};
thoughtsobj.thought = thought;
userobj.thoughts.push(thoughtsobj);
}

return userobj;
});

//Gets thought data based on Thought model
const thoughts = (users) => {
const thoughtData = thoughts.map((thought) => {
const thoughtobj = {};
thoughtobj.thoughtText = thought;
const user = users.find((user) => user.username === getRandomUserName());
thoughtobj.username = user.username;
thoughtobj.reactions = [];
const reactions = getRandomReactions(3);

for (const reaction of reactions) {
const reactionobj = {};
reactionobj.reactionBody = reaction;
reactionobj.username = getRandomUserName();
thoughtobj.reactions.push(reactionobj);
}
return thoughtobj;
});
return thoughtData;
}




module.exports = { users, thoughts };