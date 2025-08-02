'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UserProfilePage() {
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        toast.error('Could not load profile');
      }
    }

    fetchUser();
  }, []);

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Profile</h1>
      <div className="flex flex-col items-center gap-4">
       {user.avatar ? (
  <img
    src={user.avatar}
    alt="Profile"
    className="w-24 h-24 rounded-full object-cover border"
  />
) : (
  <div className="w-24 h-24 rounded-full bg-cyan-500 text-white flex items-center justify-center text-3xl font-bold border">
    {user.email.charAt(0).toUpperCase()}
  </div>
)}

        <div className="text-lg">
          {/* <p><strong>Name:</strong> {user.name}</p> */}
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        </div>
      </div>
    </div>
  );
}
