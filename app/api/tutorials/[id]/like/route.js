import { connectDB } from "@/lib/mongodb";
import Tutorial from "@/models/Tutorial";
import mongoose from "mongoose";

export async function PUT(req, context) {
  await connectDB();

  const { id: tutorialId } = await context.params; // ✅ correct way
  const { userId } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(tutorialId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return new Response(JSON.stringify({ message: "Invalid ID(s)" }), { status: 400 });
  }

  const tutorial = await Tutorial.findById(tutorialId);

  if (!tutorial) {
    return new Response(JSON.stringify({ message: "Tutorial not found" }), { status: 404 });
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const alreadyLiked = tutorial.likes.some(id => id.equals(userObjectId));

  if (alreadyLiked) {
    tutorial.likes.pull(userObjectId);
  } else {
    tutorial.likes.push(userObjectId);
  }

  await tutorial.save();

  return new Response(JSON.stringify({
    message: alreadyLiked ? "Unliked" : "Liked",
    likeCount: tutorial.likes.length
  }), { status: 200 });
}
