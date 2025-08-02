'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function TutorialDetails() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await fetch(`/api/tutorials/${id}`);
        const data = await res.json();
        setTutorial(data);
      } catch (err) {
        console.error('Error fetching tutorial:', err);
      }
    };

    if (id) {
      fetchTutorial();
    }

    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, [id]);

  if (!tutorial) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>

      <iframe
        className="w-full h-64 rounded-lg mb-4"
        src={tutorial.videoUrl}
        title={tutorial.title}
        frameBorder="0"
        allowFullScreen
      />

      <p className="text-gray-700 mb-4">{tutorial.content}</p>

      <p className="text-sm mt-2 text-gray-600">
        <strong>Author:</strong>  {tutorial.author?.email || "N/A"}<br />
        <strong>Category:</strong> {tutorial.category}<br />
        <strong>Likes:</strong> {tutorial.likes?.length || 0} |
        <strong> Comments:</strong> {tutorial.comments?.length || 0} |
        <strong> Shares:</strong> {tutorial.shareCount || 0}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {tutorial.comments?.length > 0 ? (
          tutorial.comments.map((comment, idx) => (
            <div key={idx} className="bg-gray-100 p-3 rounded mb-2">
              <p className="text-sm text-gray-800">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {comment.user?.email || 'Unknown user'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
