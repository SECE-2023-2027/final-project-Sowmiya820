'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TutorialCard from '@/components/TutorialCard';

export default function UserDashboard() {
  const [user, setUser] = useState({ email: '', role: '' });
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorialId, setSelectedTutorialId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email');
      const storedRole = localStorage.getItem('role'); // 👈 Get role from localStorage
      if (storedEmail || storedRole) {
        setUser({ email: storedEmail || '', role: storedRole || 'user' });
      }
    }
  }, []);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch('/api/tutorials');
        const data = await res.json();
        setTutorials(data);
      } catch (err) {
        console.error('Failed to fetch tutorials:', err);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome User!</h1>
      <p className="text-gray-700 mb-6">Email: {user.email || 'Not logged in'}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial._id} className="space-y-4">
            <div className="cursor-pointer">
              <TutorialCard
                tutorial={tutorial}
                onImageClick={() => {
                  if (user.role === 'admin') {
                    router.push(`/admin/tutorials/${tutorial._id}`);
                  } else {
                    setSelectedTutorialId((prev) =>
                      prev === tutorial._id ? null : tutorial._id
                    );
                  }
                }}
              />
            </div>

            {/* ✅ Show details inline for selected tutorial */}
            {selectedTutorialId === tutorial._id && (
              <div className="p-4 border rounded bg-gray-100">
                <h2 className="text-xl font-semibold mb-2">{tutorial.title}</h2>
                <p className="text-gray-700 mb-3">{tutorial.description}</p>
                <p className="text-sm text-gray-500">
                  Category: <strong>{tutorial.category}</strong>
                </p>
                <button
                  onClick={() => setSelectedTutorialId(null)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
