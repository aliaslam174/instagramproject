const mongoose = require('mongoose');

// Define post schema
const likeSchema = new mongoose.Schema({
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    userId: {type: String},
    postId: {type: String},
    like: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

// Create post model
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;