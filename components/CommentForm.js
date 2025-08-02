'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CommentForm({ tutorialId }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const userId = localStorage.getItem('userId');
    const res = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ userId, tutorialId, content: comment }),
    });

    if (res.ok) {
      setComment('');
      toast.success("Comment added");
    } else {
      toast.error("Failed to comment");
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Post Comment
      </button>
    </div>
  );
}
