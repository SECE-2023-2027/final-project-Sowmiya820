'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function EditTutorialPage() {
  const { id } = useParams();
  const router = useRouter();

  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

  const [form, setForm] = useState({
    title: '',
    videoUrl: '',
    category: '',
    content: '',
    authorName: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await fetch(`/api/tutorials/${id}`);
        const data = await res.json();
        if (res.ok) {
          setForm(data);
          setPreview(data.imageUrl);
          setVideoPreview(data.videoUrl);
        } else {
          toast.error('Failed to load tutorial.');
        }
      } catch (err) {
        toast.error('Error fetching tutorial.');
      }
    };

    if (id) fetchTutorial();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    if (!selectedVideo) return;

    setVideoFile(selectedVideo);
    setVideoPreview(URL.createObjectURL(selectedVideo));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('content', form.content);
    formData.append('authorName', form.authorName);

    if (file) {
      formData.append('image', file);
    }

    if (videoFile) {
      formData.append('video', videoFile);
    }

    try {
      const res = await fetch(`/api/tutorials/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Update failed');

      toast.success('Tutorial updated successfully!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-8 text-center">
            Edit Tutorial
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Tutorial Title"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white hover:border-slate-400"
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Update Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-emerald-50 file:to-teal-50 file:text-emerald-700 hover:file:from-emerald-100 hover:file:to-teal-100 transition-all duration-200 bg-slate-50/50 hover:border-slate-400"
              />
              {videoPreview && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Video Preview:</p>
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-w-md rounded-xl border-2 border-slate-200 shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Category Select */}
            <div>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white hover:border-slate-400"
              >
                <option value="">Select Category</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="C">C</option>
                <option value="React">React</option>
                <option value="MongoDB">MongoDB</option>
              </select>
            </div>

            {/* Content Textarea */}
            <div>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Enter tutorial content..."
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 resize-none bg-slate-50/50 focus:bg-white hover:border-slate-400"
              />
            </div>

            {/* Author Input */}
            <div>
              <input
                type="text"
                name="authorName"
                value={form.authorName}
                onChange={handleChange}
                placeholder="Author Name"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white hover:border-slate-400"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Update Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-cyan-50 file:to-blue-50 file:text-cyan-700 hover:file:from-cyan-100 hover:file:to-blue-100 transition-all duration-200 bg-slate-50/50 hover:border-slate-400"
              />
              {preview && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Image Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl border-2 border-slate-200 shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 disabled:from-slate-400 disabled:via-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Tutorial...
                </span>
              ) : (
                'Update Tutorial'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}