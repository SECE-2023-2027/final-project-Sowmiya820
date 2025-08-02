'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TutorialCard({ tutorial, onDelete, onImageClick }) {
  const router = useRouter();
  const image = tutorial.imageUrl || '/placeholder.png';

  const [currentUserId, setCurrentUserId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(tutorial.likes?.length || 0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setCurrentUserId(storedUserId);

      const likedByUser = tutorial.likes?.some(
        (id) => id === storedUserId || id?._id === storedUserId
      );

      setLiked(likedByUser);
    }
  }, [tutorial.likes]);

  const handleLike = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to like.');
      return;
    }

    try {
      const res = await fetch(`/api/tutorials/${tutorial._id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      } else {
        toast.error(data.error || 'Failed to like.');
      }
    } catch (error) {
      toast.error('Network error.');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/tutorials/${tutorial._id}`);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link.');
    }
  };

  const goToDetails = () => {
    router.push(`/tutorials/${tutorial._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer relative">
<img
  src={image}
  alt={tutorial.title}
  className="w-full h-48 object-cover"
  // onClick={onImageClick}  // ✅ Use only custom click if provided
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder.png';
  }}
/>


      <div className="p-4">
        <h2 className="text-xl font-bold mb-1" onClick={onImageClick || goToDetails}>
          {tutorial.title}
        </h2>
        <p className="text-sm text-gray-500 mb-1">
          {tutorial.category} | 👤 {tutorial.authorName || 'Anonymous'}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          📧 {tutorial.author?.email || 'No email'}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-3">{tutorial.content}</p>

        <div className="flex justify-between text-sm text-gray-600 items-center">
          <button
            onClick={handleLike}
            className={`text-sm px-3 py-1 rounded ${liked ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            👍 {liked ? 'Liked' : 'Like'}
          </button>

          <span>❤️ {likeCount}</span>

          <span className="cursor-pointer hover:underline" onClick={goToDetails}>
            💬 {tutorial.comments?.length || 0}
          </span>

          <button onClick={handleShare} className="text-blue-500 hover:underline text-sm">
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
}
