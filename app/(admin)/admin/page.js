'use client';
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import TutorialCard from "@/components/TutorialCard";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [tutorials, setTutorials] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/tutorials');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTutorials(data);
        } else {
          console.error('API Error:', data?.error || 'Unexpected response');
          toast.error("Failed to load tutorials.");
          setTutorials([]);
        }
      } catch (error) {
        console.error('Error fetching tutorials:', error);
        toast.error("Error fetching tutorials.");
        setTutorials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tutorial?")) return;
    try {
      const res = await fetch(`/api/tutorials/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        startTransition(() => {
          setTutorials((prev) => prev.filter((tut) => tut._id !== id));
        });
        toast.success("Tutorial deleted successfully!");
      } else {
        toast.error("Failed to delete tutorial.");
      }
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      toast.error("Something went wrong.");
    }
  };

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Admin! 👋</h1>
              <p className="text-blue-100 mt-1">Manage all your tutorials from one place</p>
            </div>
            <Link href="/admin/tutorials/create" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg border border-white/20 hover:border-white/30 transition font-medium flex items-center gap-2 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Tutorial
            </Link>
          </div>
        </div>

        {/* Stats + Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tutorials', value: tutorials.length, color: 'blue', iconPath: 'M12 6.253v13...' },
            { label: 'Published', value: tutorials.filter(t => t.status === 'published').length, color: 'green', iconPath: 'M9 12l2 2 4-4...' },
            { label: 'Drafts', value: tutorials.filter(t => t.status === 'draft').length, color: 'amber', iconPath: 'M15.232 5.232l3.536...' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <h3 className={`text-2xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                  <svg className={`w-6 h-6 text-${stat.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.iconPath} />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Search */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-400"
              />
              <div className="absolute left-3 top-2.5 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      
      

        {/* Tutorials Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Tutorials</h2>
          
          </div>

          {filteredTutorials.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xl font-semibold text-slate-800 mb-2">
                {searchQuery ? 'No tutorials found' : 'No tutorials yet'}
              </p>
              <p className="text-slate-600 mb-6">
                {searchQuery
                  ? `No tutorials match "${searchQuery}".`
                  : 'Get started by creating your first tutorial.'}
              </p>
              {!searchQuery && (
                <Link
                  href="/admin/tutorials/create"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create First Tutorial
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTutorials.slice(0, 6).map((tutorial) => (
                <div key={tutorial._id} className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md overflow-hidden transition-transform transform hover:scale-[1.02]">
                  <div className="relative">
                    <TutorialCard
                      tutorial={tutorial}
                      onImageClick={() => window.location.href = `/tutorials/${tutorial._id}`}
                    />
                    {/* Hover Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Link href={`/admin/tutorials/${tutorial._id}`} className="action-button bg-blue-600" title="View">
                        <EyeIcon />
                      </Link>
                      <Link href={`/admin/tutorials/edit/${tutorial._id}`} className="action-button bg-emerald-600" title="Edit">
                        <EditIcon />
                      </Link>
                      <button onClick={() => handleDelete(tutorial._id)} className="action-button bg-red-600" title="Delete">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 border-t border-slate-100 text-sm text-slate-600 flex justify-between">
                    <span>CreatedAt: {new Date(tutorial.createdAt).toLocaleDateString()}</span>
                    {/* <span>{tutorial.views || 0} views</span> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTutorials.length > 6 && (
            <div className="text-center mt-8">
              <Link href="/admin/tutorials" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition">
                View All {tutorials.length} Tutorials
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// Replace these icons with text buttons:
const EyeIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 17l-4 1 1-4z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
  </svg>
);
