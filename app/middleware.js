import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // ✅ Paths to protect
  const isAdminPath = path.startsWith('/admin');
  const isUserPath = path.startsWith('/user');

  if (isAdminPath || isUserPath) {
    if (!token) {
      // Not logged in
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (isAdminPath && decoded.role !== 'admin') {
        // User trying to access admin path
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      // ✅ Authorized
      return NextResponse.next();
    } catch (err) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next(); // Allow all other routes
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
