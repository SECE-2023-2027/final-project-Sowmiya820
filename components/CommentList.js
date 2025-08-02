'use client';
import { useEffect, useState } from 'react';

export default function CommentList({ tutorialId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/tutorials/${tutorialId}`);
      const data = await res.json();
      setComments(data.comments || []);
    };
    fetchComments();
  }, [tutorialId]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, i) => (
          <div key={i} className="border-b py-2">
            <p className="font-medium">{comment.user?.name}</p>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
