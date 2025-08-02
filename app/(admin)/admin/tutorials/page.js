"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);
  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    category: "",
    content: "",
    imageUrl: "",
    authorName: "",
  });

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    const res = await fetch(`/api/tutorials/${tutorialId}`);
    const data = await res.json();
    setTutorials(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tutorials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Tutorial created!");
      setForm({
        title: "",
        videoUrl: "",
        category: "",
        content: "",
        imageUrl: "",
        authorName: "",
      });
      fetchTutorials();
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Create Tutorial</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {[
          { name: "title", placeholder: "Title" },
          { name: "videoUrl", placeholder: "Video URL" },
          { name: "category", placeholder: "Category" },
          { name: "imageUrl", placeholder: "Image URL" },
          { name: "authorName", placeholder: "Author Name" },
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            placeholder={placeholder}
            value={form[name]}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded h-28"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">All Tutorials</h2>

      {tutorials.map((tut) => (
        <div
          key={tut._id}
          className="bg-white border p-4 rounded shadow mb-4 space-y-2"
        >
          <h3 className="text-lg font-bold">{tut.title}</h3>
          <p><strong>Category:</strong> {tut.category}</p>
          <p>{tut.content}</p>

          <p>
            <strong>Author:</strong> {tut.authorName || tut.author?.name} (
            {tut.author?.email})
          </p>

          {tut.videoUrl && (
            <iframe
              width="100%"
              height="250"
              src={tut.videoUrl.replace("watch?v=", "embed/")}
              title="YouTube Video"
              frameBorder="0"
              allowFullScreen
              className="rounded"
            ></iframe>
          )}

          <div className="flex gap-4 text-sm text-gray-600 mt-2">
            {tut.likes?.length > 0 && <span>👍 {tut.likes.length}</span>}
            {tut.comments?.length > 0 && <span>💬 {tut.comments.length}</span>}
            {tut.shares?.length > 0 && <span>🔁 {tut.shares.length}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
