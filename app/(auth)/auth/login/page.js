'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);
      console.log('User ID:', data.user._id);
      console.log('User Role:', data.user.role);
      console.log('User Email:', data.user.email);
      toast.success('Login successful');

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TutorialsBlog
              </h1>
            </Link>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign In
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}