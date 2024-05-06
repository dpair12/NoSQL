const router = require('express').Router();
//Importing functions from User Controller to Assign to Routes
const {
getUsers,
getSingleUser,
createUser,
UpdateUser,
DeleteUser,
addFriend,
DeleteFriend,
} = require('../../controllers/UserController');

// api/users
router.route('/').get(getUsers);
router.route('/').post(createUser);

// api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(UpdateUser);
router.route('/:userId').delete(DeleteUser);

// api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(DeleteFriend);

module.exports = router;
