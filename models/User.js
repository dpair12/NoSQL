const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
username: {type: String, unique: true, required: true, trimmed: true},
email: {type: String, required: true, unique: true,
validate: {
validator: function (v) {
return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v);
},
message: props => `${props.value} is not a valid email address!`
},
},
thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const User = model('User', UserSchema);

module.exports = User; 