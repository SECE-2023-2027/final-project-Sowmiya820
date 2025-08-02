// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { toast } from 'react-toastify';

// export default function UserTutorialPage() {
//   const { id } = useParams();
//   const [tutorial, setTutorial] = useState(null);
//   const [comment, setComment] = useState('');
// const [isLiked, setIsLiked] = useState(false);

//   const [likeCount, setLikeCount] = useState(0);

//   const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   useEffect(() => {
//     async function fetchTutorial() {
//       try {
//         const res = await fetch(`/api/tutorials/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch tutorial');
//         const data = await res.json();
//         setTutorial(data);

//         // Fetch comments separately if not included
//         if (!data.comments || data.comments.length === 0) {
//           const commentsRes = await fetch(`/api/tutorials/${id}/comment`);
//           if (commentsRes.ok) {
//             const commentsData = await commentsRes.json();
//             setTutorial((prev) => ({ ...prev, comments: commentsData }));
//           }
//         }
//       } catch (error) {
//         toast.error('Error loading tutorial');
//         console.error(error);
//       }
//     }

//     fetchTutorial();
//   }, [id]);

//   const handleLike = async () => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       toast.error('Please log in to like.');
//       return;
//     }

//     try {
//       const res = await fetch(`/api/tutorials/${tutorial._id}/like`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//        if (res.ok) {
//   setIsLiked(data.liked); // <-- FIXED
//   setLikeCount(data.likeCount); // already correct
// }

//       } else {
//         toast.error(data.error || 'Failed to like.');
//       }
//     } catch (error) {
//       toast.error('Network error.');
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/tutorials/${tutorial._id}`);
//       toast.success('Link copied to clipboard!');
//     } catch {
//       toast.error('Failed to copy link.');
//     }
//   };

 

//   const handleCommentSubmit = async () => {
//     if (!comment.trim()) return;

//     if (!userId) {
//       toast.error("You must be logged in to comment");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/tutorials/${id}/comment`, {
//         method: 'POST',
//         body: JSON.stringify({ text: comment, userId }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!res.ok) throw new Error('Comment failed');
//       const result = await res.json();

//       setTutorial((prev) => ({
//         ...prev,
//         comments: [{ user: { name: 'You' }, text: comment }, ...(prev.comments || [])],
//       }));
//       setComment('');
//     } catch (err) {
//       toast.error('Failed to add comment');
//     }
//   };

//   if (!tutorial) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
//       <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
//       <p className="text-sm text-gray-500 mb-1">
//         Category: {tutorial.category} | By {tutorial.authorName || 'Admin'}
//       </p>
//       <img
//         src={tutorial.imageUrl || '/placeholder.png'}
//         alt="Tutorial"
//         className="w-full h-64 object-cover rounded-lg my-4"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = '/placeholder.png';
//         }}
//       />

//       {tutorial.videoUrl && (
//         <div className="my-4">
//           <video controls className="w-full rounded-lg">
//             <source src={tutorial.videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}

//       <p className="text-gray-800 text-lg leading-relaxed my-4">{tutorial.content}</p>

      
//         <div className="flex justify-between text-sm text-gray-600 items-center">
//    <button
//   onClick={handleLike}
//   className={`text-sm px-3 py-1 rounded ${isLiked ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
// >
//   ❤️ {isLiked ? 'Liked' : 'Like'}
// </button>



//           <span>  ❤️{likeCount}</span>

//           <button onClick={handleShare} className="text-blue-500 hover:underline text-sm">
//             🔗 Share
//           </button>
//         </div>
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">Comments 💬</h3>
//         <div className="flex items-center gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="flex-1 p-2 border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Post
//           </button>
//         </div>

//         {tutorial.comments?.length > 0 ? (
//           <ul className="space-y-2">
//             {tutorial.comments.map((cmt, idx) => (
//               <li key={idx} className="bg-gray-100 p-2 rounded">
//                 <span className="font-medium">{cmt.user?.name || 'User'}:</span>{' '}
//                 {cmt.text}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UserTutorialPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    async function fetchTutorial() {
      try {
        const res = await fetch(`/api/tutorials/${id}`);
        if (!res.ok) throw new Error('Failed to fetch tutorial');
        const data = await res.json();

        setTutorial(data);
        setLikeCount(data.likes?.length || 0); // ✅ Initialize like count

        // ✅ Check if current user has already liked it
        if (data.likes && userId) {
          setIsLiked(data.likes.includes(userId));
        }

        // Fetch comments if not present
        if (!data.comments || data.comments.length === 0) {
          const commentsRes = await fetch(`/api/tutorials/${id}/comment`);
          if (commentsRes.ok) {
            const commentsData = await commentsRes.json();
            setTutorial((prev) => ({ ...prev, comments: commentsData }));
          }
        }
      } catch (error) {
        toast.error('Error loading tutorial');
        console.error(error);
      }
    }

    fetchTutorial();
  }, [id, userId]);

  const handleLike = async () => {
    if (!userId) {
      toast.error('Please log in to like.');
      return;
    }

    // ✅ Optimistically update UI
    const prevLiked = isLiked;
    setIsLiked(!prevLiked);
    setLikeCount((count) => (prevLiked ? count - 1 : count + 1));

    try {
      const res = await fetch(`/api/tutorials/${tutorial._id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Rollback UI if failed
        setIsLiked(prevLiked);
        setLikeCount((count) => (prevLiked ? count + 1 : count - 1));
        toast.error(data.error || 'Failed to like.');
      }
    } catch (error) {
      // Rollback on error
      setIsLiked(prevLiked);
      setLikeCount((count) => (prevLiked ? count + 1 : count - 1));
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

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    if (!userId) {
      toast.error("You must be logged in to comment");
      return;
    }

    try {
      const res = await fetch(`/api/tutorials/${id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ text: comment, userId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Comment failed');
      setTutorial((prev) => ({
        ...prev,
        comments: [{ user: { name: 'You' }, text: comment }, ...(prev.comments || [])],
      }));
      setComment('');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  if (!tutorial) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        Category: {tutorial.category} | By {tutorial.authorName || 'Admin'}
      </p>

      <img
        src={tutorial.imageUrl || '/placeholder.png'}
        alt="Tutorial"
        className="w-full h-64 object-cover rounded-lg my-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder.png';
        }}
      />

      {tutorial.videoUrl && (
        <div className="my-4">
          <video controls className="w-full rounded-lg">
            <source src={tutorial.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <p className="text-gray-800 text-lg leading-relaxed my-4">{tutorial.content}</p>

      <div className="flex justify-between text-sm text-gray-600 items-center">
        <button
          onClick={handleLike}
          className={`text-sm px-3 py-1 rounded transition-colors duration-200 ${
            isLiked ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          ❤️ {isLiked ? 'Liked' : 'Like'}
        </button>

        <span>❤️ {likeCount}</span>

        <button onClick={handleShare} className="text-blue-500 hover:underline text-sm">
          🔗 Share
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comments 💬</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>

        {tutorial.comments?.length > 0 ? (
          <ul className="space-y-2">
            {tutorial.comments.map((cmt, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded">
                <span className="font-medium">{cmt.user?.name || 'User'}:</span> {cmt.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
