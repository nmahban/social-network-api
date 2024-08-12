const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString()
  }
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', ThoughtSchema);
