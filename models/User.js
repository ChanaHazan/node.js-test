const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {minlength: 6, type: String, required: true},
  role: {type: String, enum: ['admin', 'viewer'],default: 'viewer'}
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);