import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // ✅ Accept only these values
    required: true,
  },
   bio: String,
  avatar: String,
}, {
  timestamps: true,
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);
export default User;
