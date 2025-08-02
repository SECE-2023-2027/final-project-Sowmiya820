'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-950 via-purple-950 to-violet-950 text-white shadow-xl border-b border-indigo-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              TutorialsBlog
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/user" 
              className="text-purple-200 hover:text-white hover:bg-indigo-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
            >
              Home
            </Link>
            <Link 
              href="/user/tutorials" 
              className="text-purple-200 hover:text-white hover:bg-indigo-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
            >
              Blogs
            </Link>
            <Link 
              href="/user/profile" 
              className="text-purple-200 hover:text-white hover:bg-indigo-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-indigo-900"
            >
              Logout
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (you'll need to add state to toggle this) */}
      <div className="md:hidden border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          <Link
            href="/user"
            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/user/tutorials"
            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Blogs
          </Link>
          <Link
            href="/user/profile"
            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}