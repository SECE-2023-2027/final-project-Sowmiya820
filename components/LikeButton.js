'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LikeButton({ tutorialId }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const userId = localStorage.getItem('userId');
    const res = await fetch(`/api/like`, {
      method: 'POST',
      body: JSON.stringify({ userId, tutorialId }),
    });

    if (res.ok) {
      setLiked(true);
      toast.success("Liked!");
    } else {
      toast.error("Failed to like");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded ${liked ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
    >
      👍 Like
    </button>
  );
}
