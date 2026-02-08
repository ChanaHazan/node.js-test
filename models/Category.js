
const categorySchema = new mongoose.Schema({
  name: {
    unique: true,
    trim: true
  }
});
