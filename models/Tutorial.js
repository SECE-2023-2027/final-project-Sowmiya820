// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     text: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now },
//   },
//   { _id: false }
// );
// const TutorialSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     videoUrl: { type: String, required: true },
//     category: {
//       type: String,
//       required: true,
//       enum: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C', 'C++'],
//     },
//     content: { type: String, required: true },
//     imageUrl: { type: String },
//     likeCount: { type: Number, default: 0 },
//     shareCount: { type: Number, default: 0 },
//      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//       author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Change this if your author is stored under Admin model
//       required: true,
//     },
//     authorName: {
//   type: String,
//   required: true, // manually entered by admin
// },
//     comments: [commentSchema],
 
//   },
//   { timestamps: true }
// );
// const Tutorial = mongoose.models?.Tutorial || mongoose.model("Tutorial", TutorialSchema);
// export default Tutorial;



import mongoose from "mongoose";

// Comment schema (reused in main schema)
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Main tutorial schema
const TutorialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C', 'C++'],
    },
    content: { type: String, required: true },
    imageUrl: { type: String },

    // 🚀 Functional fields
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],

    // 🧑‍💼 Author details
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Admin" if needed
      required: true,
    },
    authorName: {
      type: String,
      required: true, // Manually entered
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.models?.Tutorial || mongoose.model("Tutorial", TutorialSchema);
export default Tutorial;
