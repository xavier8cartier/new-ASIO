"use client";

import React, { useState } from 'react';
import { Search, MapPin, BookOpen, User, Menu, X, ChevronLeft, ChevronRight, Globe, Users, ArrowLeft, Clock, Filter, AlertCircle, Calendar } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_INSTITUTES = [
  { id: 'SDT', name: 'School of Digital Technologies' },
  { id: 'BFM', name: 'Baltic Film, Media and Arts School' },
  { id: 'SEH', name: 'School of Educational Sciences' },
  { id: 'SOG', name: 'School of Governance, Law and Society' },
];

const MOCK_GROUPS = [
  { id: 'IFIFB-2', name: 'IFIFB-2 - Informaatika', instId: 'SDT' },
  { id: 'IFIFB-1', name: 'IFIFB-1 - Informaatika', instId: 'SDT' },
  { id: 'IFFIM-1', name: 'IFFIM-1 - Inimese ja arvuti interaktsioon', instId: 'SDT' },
  { id: 'KOKOB-3', name: 'KOKOB-3 - Ristmeedia', instId: 'BFM' },
  { id: 'RIAGM-1', name: 'RIAGM-1 - Riigiteadused', instId: 'SOG' },
  { id: 'KAKOB-1', name: 'KAKOB-1 - Kasvatusteadused', instId: 'SEH' },
];

const MOCK_TIMETABLE_IFIFB2 = [
  // Monday
  { id: 1, day: 'Mon', start: '10:15', end: '11:45', title: 'IFI6071.DT Tarkvaratehnika', type: 'Loeng', room: 'A-402', lecturer: 'M. K.', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
  { id: 2, day: 'Mon', start: '12:15', end: '13:45', title: 'IFI6071.DT Tarkvaratehnika', type: 'Praktikum', room: 'A-402', lecturer: 'M. K.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
  { id: 3, day: 'Mon', start: '16:15', end: '17:45', title: 'IFI6066.DT Andmebaasid II', type: 'Praktikum', room: 'A-400', lecturer: 'I. K.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
  // Tuesday
  { id: 4, day: 'Tue', start: '08:15', end: '09:45', title: 'IFI6067.DT Kasutajaliidese esteetika', type: 'Loeng', room: 'A-325', lecturer: 'D. M.', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
  { id: 5, day: 'Tue', start: '10:15', end: '11:45', title: 'IFI6067.DT Kasutajaliidese esteetika', type: 'Seminar', room: 'A-325', lecturer: 'D. M.', color: 'bg-orange-50 border border-orange-200 text-orange-900' },
  // Wednesday
  { id: 6, day: 'Wed', start: '14:15', end: '15:45', title: 'Vabaaine', type: 'Seminar', room: 'M-218', lecturer: 'T. L.', color: 'bg-orange-50 border border-orange-200 text-orange-900' },
  // Thursday
  { id: 7, day: 'Thu', start: '12:15', end: '13:45', title: 'IFI6069.DT Veebiprogrammeerimine', type: 'Loeng', room: 'S-244', lecturer: 'A. P.', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
  // Friday
  { id: 8, day: 'Fri', start: '10:15', end: '13:45', title: 'IFI6069.DT Veebiprogrammeerimine', type: 'Praktikum', room: 'S-244', lecturer: 'A. P.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' }
];

const WEEK_DAYS = [
  { id: 'Mon', name: 'Monday', date: '23.03' },
  { id: 'Tue', name: 'Tuesday', date: '24.03' },
  { id: 'Wed', name: 'Wednesday', date: '25.03' },
  { id: 'Thu', name: 'Thursday', date: '26.03' },
  { id: 'Fri', name: 'Friday', date: '27.03' },
];

type ViewMode = 'HOME' | 'BROWSE' | 'TIMETABLE';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Navigation State
  const [view, setView] = useState<ViewMode>('HOME');
  const [browseCategory, setBrowseCategory] = useState<string | null>(null);
  const [selectedInstitute, setSelectedInstitute] = useState<string>('SDT');
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'curricula', title: "Curricula / Courses", icon: <BookOpen className="w-6 h-6" />, desc: "Search and filter by subject codes or names." },
    { id: 'groups', title: "Study Groups", icon: <Users className="w-6 h-6" />, desc: "Timetables for specific study groups." },
    { id: 'teachers', title: "Lecturer Schedules", icon: <User className="w-6 h-6" />, desc: "Find individual teaching staff timetables." },
    { id: 'rooms', title: "Room Availability", icon: <MapPin className="w-6 h-6" />, desc: "Check room bookings across campus buildings." },
  ];

  // Navigation Handlers
  const goHome = () => {
    setView('HOME');
    setBrowseCategory(null);
    setSelectedGroup(null);
    setSearchQuery('');
  };

  const goToBrowse = (catId: string) => {
    setBrowseCategory(catId);
    setView('BROWSE');
  };

  const goToTimetable = (group: any) => {
    setSelectedGroup(group);
    setView('TIMETABLE');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      goToTimetable(MOCK_GROUPS[0]); // Defaulting to IFIFB-2 for the hardcode mock
    }
  };

  const handleQuickSearchClick = () => {
    setSearchQuery('IFIFB-2');
    goToTimetable(MOCK_GROUPS[0]);
  };

  // View renders
  const renderHomeContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero / Search Section */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">How can we help you today?</h2>
          <p className="text-slate-500 mb-6">Search for rooms, lecturers, or study groups to see their specific schedules.</p>

          <form onSubmit={handleSearchSubmit} className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
            <input
              type="text"
              placeholder="e.g. A-402, John Doe, IFIFB-2..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all text-lg"
            />
          </form>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Search:</span>
            <button onClick={handleQuickSearchClick} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">IFIFB-2</button>
            <button onClick={handleQuickSearchClick} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">HK-1234</button>
            <button onClick={handleQuickSearchClick} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">Main Hall</button>
          </div>
        </div>
      </section>

      {/* Main Navigation Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => goToBrowse(cat.id)}
            className="group p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-red-200 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-50 group-hover:text-red-700 transition-colors relative z-10">
              {cat.icon}
            </div>
            <h3 className="font-bold text-lg mb-1 relative z-10">{cat.title}</h3>
            <p className="text-slate-500 text-sm relative z-10">{cat.desc}</p>
          </button>
        ))}
      </section>

      {/* Security Alert Banner */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm">
        <div className="bg-blue-200 p-1.5 rounded-full">
          <AlertCircle className="w-4 h-4" />
        </div>
        <span>Connection is secure. All timetable data is encrypted via SSL.</span>
      </div>
    </div>
  );

  const renderBrowseContent = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <button 
        onClick={goHome}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-700 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="w-6 h-6 text-slate-400" />
              Browse Study Groups
            </h2>
            <p className="text-slate-500 text-sm mt-1">Select an institute, then choose a specific group to view its timetable.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
          {/* Left Pane: Institutes */}
          <div className="md:col-span-5 lg:col-span-4 border-r border-slate-100 bg-white">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-6 pt-6 pb-2">Institutes</h3>
            <ul className="pb-4">
              {MOCK_INSTITUTES.map(inst => (
                <li key={inst.id}>
                  <button 
                    onClick={() => setSelectedInstitute(inst.id)}
                    className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                      selectedInstitute === inst.id 
                        ? 'bg-red-50 text-red-700 border-red-700' 
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {inst.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Pane: Groups View */}
          <div className="md:col-span-7 lg:col-span-8 bg-slate-50 p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Available Groups</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_GROUPS.filter(g => g.instId === selectedInstitute).map(group => (
                <button
                  key={group.id}
                  onClick={() => goToTimetable(group)}
                  className="bg-white border border-slate-200 p-4 rounded-xl text-left hover:border-red-300 hover:shadow-md transition-all group/btn"
                >
                  <div className="font-bold text-slate-900 group-hover/btn:text-red-700 transition-colors">{group.id}</div>
                  <div className="text-sm text-slate-500 mt-1 line-clamp-1">{group.name}</div>
                </button>
              ))}
              {MOCK_GROUPS.filter(g => g.instId === selectedInstitute).length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p>No groups found for this institute.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetableContent = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button 
          onClick={() => setView('BROWSE')}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Browse
        </button>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">Print</button>
          <button className="px-3 py-1.5 text-sm font-medium bg-red-700 text-white rounded-lg shadow-sm hover:bg-red-800 transition-colors">Export iCal</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Timetable: <span className="text-red-700">{selectedGroup?.id}</span>
          </h2>
          <p className="text-slate-500 mt-1">{selectedGroup?.name} • Spring Semester 2026</p>
        </div>

        {/* Desktop Schedule Grid (hidden on mobile, shown md+) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4">
            {WEEK_DAYS.map(day => (
              <div key={day.id} className="min-h-[600px] flex flex-col">
                {/* Day Header */}
                <div className="bg-slate-100 rounded-t-xl p-3 text-center border border-slate-200 border-b-0">
                  <div className="font-bold text-slate-900">{day.name}</div>
                  <div className="text-sm text-slate-500">{day.date}</div>
                </div>
                {/* Day Body */}
                <div className="bg-slate-50 border border-slate-200 rounded-b-xl p-2 grow flex flex-col gap-2">
                  {MOCK_TIMETABLE_IFIFB2.filter(e => e.day === day.id).length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-4 font-medium italic">No classes</div>
                  ) : (
                    MOCK_TIMETABLE_IFIFB2.filter(e => e.day === day.id).map(event => (
                      <div key={event.id} className={`p-3 rounded-lg shadow-sm flex flex-col justify-between ${event.color} transition-transform hover:-translate-y-0.5`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold leading-none bg-white/60 px-2 py-1 rounded shadow-sm">{event.start} - {event.end}</span>
                        </div>
                        <h4 className="font-bold text-sm leading-tight mb-1">{event.title}</h4>
                        <div className="text-xs opacity-90 mb-3">{event.type}</div>
                        
                        <div className="mt-auto space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <MapPin className="w-3 h-3" />
                            {event.room}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <User className="w-3 h-3" />
                            {event.lecturer}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Schedule List (shown on <md) */}
        <div className="md:hidden space-y-6">
          {WEEK_DAYS.map(day => {
            const dayEvents = MOCK_TIMETABLE_IFIFB2.filter(e => e.day === day.id);
            if (dayEvents.length === 0) return null;
            return (
              <div key={day.id}>
                <h3 className="font-bold text-lg mb-3 flex items-center justify-between border-b pb-2">
                  <span>{day.name}</span>
                  <span className="text-sm font-normal text-slate-500">{day.date}</span>
                </h3>
                <div className="space-y-3">
                  {dayEvents.map(event => (
                    <div key={event.id} className={`p-4 rounded-xl shadow-sm border ${event.color}`}>
                      <div className="flex justify-between items-start mb-2 text-sm font-bold opacity-80">
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded">
                          <Clock className="w-4 h-4" />
                          {event.start} - {event.end}
                        </div>
                        <span className="uppercase text-[10px] tracking-wider bg-white/50 px-2 py-1 rounded">{event.type}</span>
                      </div>
                      <h4 className="font-bold text-base mb-3">{event.title}</h4>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {event.room}</span>
                        <span className="flex items-center gap-1"><User className="w-4 h-4"/> {event.lecturer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Top Navigation --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <button onClick={goHome} className="flex items-center gap-3 text-left focus:outline-none">
              <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">TÜ</div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold leading-none text-slate-900">TALLINNA ÜLIKOOL</h1>
                <p className="text-xs text-slate-500">Timetable & Room System</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={goHome} className={`text-sm font-medium transition-colors ${view === 'HOME' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`}>Home</button>
              <button className="text-sm font-medium text-slate-600 hover:text-red-700 transition-colors">Instructions</button>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <Globe className="w-4 h-4" />
                EST
              </button>
              <button className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dynamically Rendered Content Area */}
          <div className="lg:col-span-8">
            {view === 'HOME' && renderHomeContent()}
            {view === 'BROWSE' && renderBrowseContent()}
            {view === 'TIMETABLE' && renderTimetableContent()}
          </div>

          {/* Right Column: Persistent Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Compact Calendar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-700" />
                  March 2026
                </h3>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="text-slate-400">{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 31 }).map((_, i) => {
                  const dayNum = i + 1;
                  // March 23-27 is current selected week
                  const isSelectedWeek = dayNum >= 23 && dayNum <= 29;
                  const isToday = dayNum === 23;
                  
                  return (
                    <button
                      key={i}
                      className={`py-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-200 
                        ${isToday ? 'bg-red-700 text-white font-bold shadow-md' : 
                          isSelectedWeek ? 'bg-red-50 text-red-700 font-bold border border-red-100' : 
                          'hover:bg-slate-100 font-medium text-slate-700'}
                      `}
                    >
                      {dayNum}
                    </button>
                  )
                })}
              </div>

              <button className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-100 hover:text-slate-900 transition-colors">
                Select Today
              </button>
            </div>

            {/* Quick Stats/Links */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 overflow-hidden relative shadow-md">
              <div className="relative z-10">
                <h3 className="font-bold mb-2 text-lg">Help Center</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">Need help navigating the new ASIO redesign system? Check the video tutorials.</p>
                <button className="inline-flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white font-semibold text-sm transition-colors">
                  View Instructions
                  <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600 opacity-20 rounded-full blur-3xl"></div>
            </div>

            {/* Timetable info block visible only in timetable view */}
            {view === 'TIMETABLE' && selectedGroup && (
               <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm animate-in fade-in run-in-from-bottom duration-500">
                 <h3 className="font-bold text-emerald-800 mb-1">Group Details</h3>
                 <p className="text-emerald-700 text-sm mb-3">Viewing timetable for <strong>{selectedGroup.id}</strong> in the {MOCK_INSTITUTES.find(i => i.id === selectedGroup.instId)?.name}.</p>
                 <ul className="text-xs text-emerald-600 space-y-2 font-medium">
                   <li className="flex justify-between border-b border-emerald-100/50 pb-1"><span>Total Hours this week:</span> <span>16h</span></li>
                   <li className="flex justify-between border-b border-emerald-100/50 pb-1"><span>Curriculum:</span> <span>Informaatika (BA)</span></li>
                 </ul>
               </div>
            )}
          </aside>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
            <span className="font-bold text-slate-500">TÜ</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">
            New modern view prototype for <span className="text-slate-800 font-semibold">Kasutajaliidese Esteetika</span> project.
          </p>
          <div className="flex justify-center gap-6">
            <button className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Contact Support</button>
            <button className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Privacy Policy</button>
            <button className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Terms of Use</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;