import { connectDB } from "@/lib/mongodb";
import Tutorial from "@/models/Tutorial";
import mongoose from "mongoose";

// POST a new comment
export async function POST(req, context) {
  await connectDB();

  const { id: tutorialId } = await context.params; // ✅ FIXED
  const { userId, text } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(tutorialId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return new Response(JSON.stringify({ message: "Invalid ID(s)" }), { status: 400 });
  }

  const tutorial = await Tutorial.findById(tutorialId);
  if (!tutorial) {
    return new Response(JSON.stringify({ message: "Tutorial not found" }), { status: 404 });
  }

  tutorial.comments.push({ user: userId, text });
  await tutorial.save();

  return new Response(JSON.stringify({ message: "Comment added successfully" }), { status: 201 });
}

// GET all comments
export async function GET(req, context) {
  await connectDB();

  const { id: tutorialId } =await context.params; // ✅ FIXED

  if (!mongoose.Types.ObjectId.isValid(tutorialId)) {
    return new Response(JSON.stringify({ message: "Invalid tutorial ID" }), { status: 400 });
  }

  const tutorial = await Tutorial.findById(tutorialId)
    .populate("comments.user", "name email") // populate user name/email
    .lean();

  if (!tutorial) {
    return new Response(JSON.stringify({ message: "Tutorial not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(tutorial.comments), { status: 200 });
}
