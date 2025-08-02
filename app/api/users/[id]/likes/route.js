import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const user = await User.findById(params.id).populate("likes", "title");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.likes || []);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
