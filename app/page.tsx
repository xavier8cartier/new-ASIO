"use client";

import React, { useState } from 'react';
import { Search, Calendar, MapPin, BookOpen, User, Menu, X, ChevronLeft, ChevronRight, Bell, Globe } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data for the categories
  const categories = [
    { title: "Studies & Events", icon: <Bell className="w-6 h-6" />, desc: "View university-wide schedules and public events." },
    { title: "Course Calendars", icon: <BookOpen className="w-6 h-6" />, desc: "Search and filter by subject codes or names." },
    { title: "Lecturer Schedules", icon: <User className="w-6 h-6" />, desc: "Find individual teaching staff timetables." },
    { title: "Room Availability", icon: <MapPin className="w-6 h-6" />, desc: "Check room bookings across campus buildings." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Top Navigation --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Placeholder */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold">TÜ</div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold leading-none">TALLINNA ÜLIKOOL</h1>
                <p className="text-xs text-slate-500">Timetable & Room System</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-red-700">Home</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-red-700">Instructions</a>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600">
                <Globe className="w-4 h-4" />
                EST
              </button>
              <button className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left/Central Column */}
          <div className="lg:col-span-8 space-y-8">

            {/* Hero / Search Section */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">How can we help you today?</h2>
              <p className="text-slate-500 mb-6">Search for rooms, lecturers, or study groups to see their specific schedules.</p>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  placeholder="e.g. A-402, John Doe, HK-1234..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all text-lg"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Search:</span>
                <button className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-700">Auditorium A-242</button>
                <button className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-700">ITI-6001</button>
                <button className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-700">Main Hall</button>
              </div>
            </section>

            {/* Main Navigation Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat, idx) => (
                <button key={idx} className="group p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-red-200 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                  <p className="text-slate-500 text-sm">{cat.desc}</p>
                </button>
              ))}
            </section>

            {/* Security Alert Banner (Replacement for the SSL box) */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm">
              <div className="bg-blue-200 p-1.5 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 11.388c.176 1.34 1.146 2.493 2.459 2.742l5.122.973a2 2 0 00.746 0l5.122-.973c1.313-.249 2.283-1.403 2.459-2.742a10.01 10.01 0 000-2.776c-.176-1.34-1.146-2.493-2.459-2.742l-5.122-.973a2 2 0 00-.746 0l-5.122.973c-1.313.249-2.283 1.403-2.459 2.742a10.01 10.01 0 000 2.776zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
              </div>
              <span>Connection is secure. All timetable data is encrypted via SSL.</span>
            </div>
          </div>

          {/* Right Column: Calendar & Sidebar */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Compact Calendar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">February 2026</h3>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d} className="text-slate-400">{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg text-sm cursor-pointer transition-colors ${i + 1 === 19 ? 'bg-red-700 text-white font-bold' :
                      i + 1 === 24 ? 'bg-red-100 text-red-700 font-bold' :
                        'hover:bg-slate-100'
                      }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 bg-red-700 text-white rounded-lg font-medium text-sm hover:bg-red-800 transition-colors">
                Back to Current Week
              </button>
            </div>

            {/* Quick Stats/Links */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Help Center</h3>
                <p className="text-slate-400 text-sm mb-4">New to the system? Check out our quick start guide.</p>
                <a href="#" className="inline-flex items-center text-red-400 font-semibold text-sm hover:underline">
                  View Instructions
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-700 opacity-20 rounded-full blur-2xl"></div>
            </div>

          </aside>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Mobile view available at: <span className="text-red-700 font-medium">www.tlu.ee/masio</span>
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-xs uppercase tracking-widest font-bold">Contact Support</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-xs uppercase tracking-widest font-bold">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;