import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB }  from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();

  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    if (user.role !== role) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 403 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Return full user info
    return NextResponse.json(
      {
        user: {
          _id: user._id.toString(),
          email: user.email,
          role: user.role,
        },
        token,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
          }`,
        },
      }
    );

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
