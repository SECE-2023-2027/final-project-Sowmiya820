// (user)/user/layout.js
'use client';

import UserHeader from '@/components/UserHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader />
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
