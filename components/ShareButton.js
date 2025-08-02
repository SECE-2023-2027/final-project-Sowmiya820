'use client';
import { toast } from 'react-toastify';

export default function ShareButton({ tutorialId }) {
  const handleShare = () => {
    const url = `${window.location.origin}/user/tutorials/${tutorialId}`;
    navigator.clipboard.writeText(url);
    toast.info("Link copied to clipboard!");
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 rounded bg-blue-200"
    >
      📤 Share
    </button>
  );
}
