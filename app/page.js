// app/page.js
"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header/Navigation */}
      <nav className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TutorialsBlog
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('tutorials')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              Tutorials
            </button>
            <button onClick={() => scrollToSection('categories')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              Categories
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learn & Grow
            </span>
            <br />
            <span className="text-gray-800">
              with Expert Tutorials
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Discover comprehensive tutorials, tips, and insights to master new skills 
            and advance your knowledge in technology, programming, and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/auth/register" 
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              href="/auth/login" 
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-out transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Content</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world experience
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step-by-Step</h3>
              <p className="text-gray-600">
                Follow detailed, easy-to-understand tutorials at your own pace
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">
                Join thousands of learners sharing knowledge and experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-6 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Programming Categories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of programming tutorials across different languages and technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* HTML */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">HTML</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">HTML</h3>
              <p className="text-gray-600 text-sm">Learn the foundation of web development with HTML structure and semantics</p>
            </div>

            {/* CSS */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">CSS</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">CSS</h3>
              <p className="text-gray-600 text-sm">Master styling, layouts, animations and responsive design techniques</p>
            </div>

            {/* JavaScript */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">JavaScript</h3>
              <p className="text-gray-600 text-sm">Build interactive web applications with modern JavaScript and frameworks</p>
            </div>

            {/* Python */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">PY</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Python</h3>
              <p className="text-gray-600 text-sm">From web development to AI/ML, explore Python's versatile ecosystem</p>
            </div>

            {/* Java */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">JAVA</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Java</h3>
              <p className="text-gray-600 text-sm">Enterprise applications, Android development, and object-oriented programming</p>
            </div>

            {/* C */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">C</h3>
              <p className="text-gray-600 text-sm">Master the fundamentals of programming with this powerful system language</p>
            </div>

            {/* C++ */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">C++</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">C++</h3>
              <p className="text-gray-600 text-sm">Advanced programming concepts, game development, and high-performance applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                About TutorialsBlog
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering developers worldwide with quality educational content and practical learning experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TutorialsBlog, we believe that quality education should be accessible to everyone. Our mission is to democratize programming education by providing comprehensive, easy-to-follow tutorials that bridge the gap between theory and practical application.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're a complete beginner taking your first steps into coding or an experienced developer looking to expand your skillset, our carefully crafted content is designed to meet you where you are and help you grow.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
                  <div className="text-gray-600">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                  <div className="text-gray-600">Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Expert-Led Content</h4>
                <p className="text-gray-600">
                  Our tutorials are created by industry professionals with years of hands-on experience. Each piece of content is reviewed and tested to ensure accuracy and relevance.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Practical Approach</h4>
                <p className="text-gray-600">
                  We focus on real-world applications and project-based learning. Every tutorial includes practical examples and exercises to reinforce your understanding.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Community Driven</h4>
                <p className="text-gray-600">
                  Join a vibrant community of learners and mentors. Share your progress, ask questions, and collaborate on projects with fellow developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            © 2025 TutorialsBlog. Empowering learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}