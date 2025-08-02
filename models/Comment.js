// models/Comment.js
import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutorial: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
