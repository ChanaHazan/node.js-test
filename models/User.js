

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    trim: true
  },
  password: {
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'viewer'
  }
});
