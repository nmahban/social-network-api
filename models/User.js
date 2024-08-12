const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Must be a valid email address']
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = mongoose.model('User', UserSchema);
