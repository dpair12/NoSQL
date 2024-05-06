const router = require('express').Router();
//Importing Functions from Thought Controller to Assign To Routes
const { 
getThoughts,
getSingleThought,
CreateThought,
UpdateThought,
DeleteThought,
AddReaction,
DeleteReaction,
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts);
router.route('/').post(CreateThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').put(UpdateThought);
router.route('/:thoughtId').delete(DeleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(AddReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(DeleteReaction);

module.exports = router;