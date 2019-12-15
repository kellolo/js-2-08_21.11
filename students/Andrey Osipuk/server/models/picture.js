const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  image: { type: String },
  owner: { type: Schema.ObjectId, ref: 'User' },
  likes: [{
    user: { type: Schema.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: new Date() },
  }],
  comments: [{
    user: { type: Schema.ObjectId, ref: 'User' },
    text: { type: String },
    timestamp: { type: Date, default: new Date() },
  }]
});

module.exports = mongoose.model('Picture', pictureSchema, 'pictures');
