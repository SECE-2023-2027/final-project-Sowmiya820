

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TutorialCard from '@/components/TutorialCard';
import { toast } from 'react-toastify';

export default function UserTutorialList() {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const res = await fetch('/api/tutorials');
        if (!res.ok) throw new Error('Failed to fetch tutorials');
        const data = await res.json();
        setTutorials(data);
        setFilteredTutorials(data); // initialize
      } catch (error) {
        toast.error('Error loading tutorials');
        console.error(error);
      }
    }

    fetchTutorials();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let filtered = tutorials;

    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory);
    }

    setFilteredTutorials(filtered);
  }, [searchTerm, selectedCategory, tutorials]);

  const categories = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C', 'C++'];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Browse Tutorials</h1>

      {/* 🔎 Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded-md w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded-md w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 📚 Tutorial Grid */}
      {filteredTutorials.length === 0 ? (
        <p className="text-gray-600">No tutorials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Link
              key={tutorial._id}
              href={`/user/tutorials/${tutorial._id}`}
              className="block"
            >
              <TutorialCard tutorial={tutorial} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
