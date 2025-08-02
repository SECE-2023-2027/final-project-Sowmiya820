import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const { username, email, password, role } = body;

    if (!username || !email || !password || !role) {
      console.log("Missing fields");
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }
 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("User created successfully");

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
