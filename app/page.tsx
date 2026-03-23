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
  { id: 'HILAB_jpn-1', name: 'Aasia uuringud (Jaapani uuringud) 1. õ.-a.', instId: 'BFM' }, // Added
  { id: 'KAANB-1', name: 'Andragoogika 1. õ.-a.', instId: 'SEH' }, // Added
  { id: 'KOAB-1', name: 'Ajakirjandus 1.õ.-a.', instId: 'BFM' }, // Added
];

const MOCK_TIMETABLES: Record<string, any[]> = {
  'IFIFB-2': [
    { id: 1, day: 'Mon', start: '10:15', end: '11:45', title: 'IFI6071.DT Tarkvaratehnika', type: 'Loeng', room: 'A-402', lecturer: 'M. K.', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 2, day: 'Mon', start: '12:15', end: '13:45', title: 'IFI6071.DT Tarkvaratehnika', type: 'Praktikum', room: 'A-402', lecturer: 'M. K.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
    { id: 3, day: 'Mon', start: '16:15', end: '17:45', title: 'IFI6066.DT Andmebaasid II', type: 'Praktikum', room: 'A-400', lecturer: 'I. K.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
    { id: 4, day: 'Tue', start: '08:15', end: '09:45', title: 'IFI6067.DT Kasutajaliidese esteetika', type: 'Loeng', room: 'A-325', lecturer: 'D. M.', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 5, day: 'Tue', start: '10:15', end: '11:45', title: 'IFI6067.DT Kasutajaliidese esteetika', type: 'Seminar', room: 'A-325', lecturer: 'D. M.', color: 'bg-orange-50 border border-orange-200 text-orange-900' },
    { id: 6, day: 'Wed', start: '14:15', end: '15:45', title: 'Vabaaine', type: 'Seminar', room: 'M-218', lecturer: 'T. L.', color: 'bg-orange-50 border border-orange-200 text-orange-900' },
    { id: 7, day: 'Thu', start: '12:15', end: '13:45', title: 'IFI6069.DT Veebiprogrammeerimine', type: 'Loeng', room: 'S-244', lecturer: 'A. P.', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 8, day: 'Fri', start: '10:15', end: '13:45', title: 'IFI6069.DT Veebiprogrammeerimine', type: 'Praktikum', room: 'S-244', lecturer: 'A. P.', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' }
  ],
  'HILAB_jpn-1': [
    { id: 101, day: 'Mon', start: '10:15', end: '11:45', title: 'Jaapani keel A2 (HIL6402.HT)', type: 'Loeng', room: 'S-238', lecturer: 'Masaki-Kadarik Akiko', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 102, day: 'Mon', start: '14:15', end: '15:45', title: 'Kriitiline mõtlemine (HIK6082.HT)', type: 'Loeng', room: 'A-002', lecturer: 'Laas Oliver', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 103, day: 'Tue', start: '10:15', end: '11:45', title: 'Jaapani keel A2 (HIL6402.HT)', type: 'Loeng', room: 'S-238', lecturer: 'Masaki-Kadarik Akiko', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 104, day: 'Wed', start: '10:15', end: '11:45', title: 'Jaapani keel A2 (HIL6402.HT)', type: 'Loeng', room: 'S-333', lecturer: 'Yano Maarja', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 105, day: 'Wed', start: '12:15', end: '13:45', title: 'Jaapani uuem kultuur (HIL6599.HT)', type: 'Loeng', room: 'S-240', lecturer: 'Allik Alari', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 106, day: 'Thu', start: '10:15', end: '11:45', title: 'Jaapani keel A2 (HIL6402.HT)', type: 'Loeng', room: 'S-333', lecturer: 'Yano Maarja', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
  ],
  'KAANB-1': [
    { id: 201, day: 'Mon', start: '18:00', end: '19:30', title: 'Kriitiline mõtlemine (HIK6082.HT)', type: 'Loeng', room: 'A-002', lecturer: 'Laas Oliver', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 202, day: 'Tue', start: '08:15', end: '09:45', title: 'Inglise keel B1.2 (LCE6324.HT)', type: 'Loeng', room: 'A-346', lecturer: 'Taiger Aita', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 203, day: 'Wed', start: '08:15', end: '09:45', title: 'Inglise keel B1.2 (LCE6324.HT)', type: 'Loeng', room: 'A-346', lecturer: 'Taiger Aita', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
  ],
  'KOAB-1': [
    { id: 301, day: 'Mon', start: '12:15', end: '13:45', title: 'Ajakirjandus ja ühiskond (KOA6003.FK)', type: 'Loeng', room: 'S-420', lecturer: 'Kõnno Andres', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 302, day: 'Mon', start: '14:15', end: '15:45', title: 'Audiovisuaalne loojutustus (BFM6037.FK)', type: 'Loeng', room: 'S-420', lecturer: 'Treufeldt Indrek', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 303, day: 'Tue', start: '12:00', end: '15:00', title: 'Ajakirjanduse eriala praktika infopäev', type: 'Info', room: 'A-222', lecturer: 'Tigasson Külli-Riin', color: 'bg-orange-50 border border-orange-200 text-orange-900' },
    { id: 304, day: 'Wed', start: '08:15', end: '09:45', title: 'Uudis (KOA6039.FK)', type: 'Loeng', room: 'M-225', lecturer: 'Eilat Taavi', color: 'bg-blue-50 border border-blue-200 text-blue-900' },
    { id: 305, day: 'Wed', start: '10:15', end: '11:45', title: 'Erialane inglise keel I (LCE6511.HT)', type: 'Loeng', room: 'S-417', lecturer: 'Camara Helis', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
    { id: 306, day: 'Thu', start: '10:15', end: '11:45', title: 'Erialane inglise keel I (LCE6511.HT)', type: 'Loeng', room: 'S-423', lecturer: 'Camara Helis', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
    { id: 307, day: 'Thu', start: '12:15', end: '13:45', title: 'Maailma kommunikatsiooniajalugu ja Eesti ajakirjanduse ajalugu (KOA6053.FK)', type: 'Loeng', room: 'N-307', lecturer: 'Hõbemägi Priit', color: 'bg-purple-50 border border-purple-200 text-purple-900' },
    { id: 308, day: 'Thu', start: '14:15', end: '16:00', title: 'AV tootmise alused (BFM6127.FK)', type: 'Praktikum', room: 'N-507', lecturer: 'Rajaleid Tarmo', color: 'bg-emerald-50 border border-emerald-200 text-emerald-900' },
  ],
};

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

  // Mock data for lecturers
  const MOCK_LECTURERS = [
    { id: 'MK', name: 'Mart Laanpere', instId: 'SDT' },
    { id: 'IK', name: 'Ingrid Kool', instId: 'SDT' },
    { id: 'DM', name: 'David Murphy', instId: 'SDT' },
    { id: 'AP', name: 'Andrus Paadimeister', instId: 'SDT' },
    { id: 'AA', name: 'Alari Allik', instId: 'BFM' },
    { id: 'TE', name: 'Taavi Eilat', instId: 'BFM' },
  ];

  // Mock data for rooms
  const MOCK_ROOMS = [
    { id: 'A-402', name: 'A-402 - Computer Lab', building: 'A' },
    { id: 'A-325', name: 'A-325 - Seminar Room', building: 'A' },
    { id: 'S-244', name: 'S-244 - Lecture Hall', building: 'S' },
    { id: 'M-218', name: 'M-218 - Terra Building', building: 'M' },
    { id: 'N-307', name: 'N-307 - Nova Building', building: 'N' },
  ];

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 23)); // March 23, 2026
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)); // Display month

  // Navigation State
  const [view, setView] = useState<ViewMode>('HOME');
  const [browseCategory, setBrowseCategory] = useState<string | null>(null);
  const [selectedInstitute, setSelectedInstitute] = useState<string>('SDT');
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'EST' | 'ENG'>('EST');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

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
    setSelectedLecturer(null);
    setSelectedRoom(null);
    setSearchQuery('');
  };

  const goToBrowse = (catId: string) => {
    setBrowseCategory(catId);
    setView('BROWSE');
  };

  const goToTimetable = (group: any) => {
    setSelectedGroup(group);
    setSelectedLecturer(null);
    setSelectedRoom(null);
    setView('TIMETABLE');
  };

  const goToLecturerSchedule = (lecturer: any) => {
    setSelectedLecturer(lecturer);
    setSelectedGroup(null);
    setSelectedRoom(null);
    setView('TIMETABLE');
  };

  const goToRoomAvailability = (room: any) => {
    setSelectedRoom(room);
    setSelectedGroup(null);
    setSelectedLecturer(null);
    setView('TIMETABLE');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundGroup = MOCK_GROUPS.find(g => g.id.toLowerCase() === searchQuery.trim().toLowerCase());
    if (foundGroup) {
      goToTimetable(foundGroup);
    } else if (searchQuery.trim().length > 0) {
      showNotification(`No group found for "${searchQuery}"`);
    }
  };

  const handleQuickSearchClick = (groupId: string) => {
    const foundGroup = MOCK_GROUPS.find(g => g.id === groupId);
    if (foundGroup) {
      setSearchQuery(groupId);
      goToTimetable(foundGroup);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportICal = () => {
    showNotification("Generating iCal file... Download will start shortly.");
  };

  const handleInstructions = () => {
    showNotification("Opening instructions PDF...");
  };

  const toggleLanguage = () => {
    const newLang = language === 'EST' ? 'ENG' : 'EST';
    setLanguage(newLang);
    showNotification(`Language switched to ${newLang}`);
  };

  const handleContactSupport = () => {
    showNotification("Redirecting to support portal...");
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
            <button onClick={() => handleQuickSearchClick('IFIFB-2')} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">IFIFB-2</button>
            <button onClick={() => handleQuickSearchClick('KOAB-1')} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">KOAB-1</button>
            <button onClick={() => handleQuickSearchClick('HILAB_jpn-1')} className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100">HILAB_jpn-1</button>
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

  const renderBrowseContent = () => {
    const titleMap: Record<string, string> = {
      'groups': 'Browse Study Groups',
      'teachers': 'Find Lecturers',
      'rooms': 'Check Rooms',
      'curricula': 'Curricula / Courses'
    };

    return (
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
                {browseCategory ? titleMap[browseCategory] : 'Browse'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">Select an item below to see its specific schedule.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
            {/* Left Pane: Categories/Institutes */}
            <div className="md:col-span-4 border-r border-slate-100 bg-white">
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

            {/* Right Pane: Items View */}
            <div className="md:col-span-8 bg-slate-50 p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {browseCategory === 'groups' ? 'Available Groups' : browseCategory === 'teachers' ? 'Found Lecturers' : 'Campus Rooms'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {browseCategory === 'groups' && MOCK_GROUPS.filter(g => g.instId === selectedInstitute).map(group => (
                  <button
                    key={group.id}
                    onClick={() => goToTimetable(group)}
                    className="bg-white border border-slate-200 p-4 rounded-xl text-left hover:border-red-300 hover:shadow-md transition-all group/btn"
                  >
                    <div className="font-bold text-slate-900 group-hover/btn:text-red-700 transition-colors">{group.id}</div>
                    <div className="text-sm text-slate-500 mt-1 line-clamp-1">{group.name}</div>
                  </button>
                ))}

                {browseCategory === 'teachers' && MOCK_LECTURERS.filter(l => l.instId === selectedInstitute).map(lecturer => (
                  <button
                    key={lecturer.id}
                    onClick={() => goToLecturerSchedule(lecturer)}
                    className="bg-white border border-slate-200 p-4 rounded-xl text-left hover:border-red-300 hover:shadow-md transition-all group/btn"
                  >
                    <div className="font-bold text-slate-900 group-hover/btn:text-red-700 transition-colors">{lecturer.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{lecturer.id} • Room A-402</div>
                  </button>
                ))}

                {browseCategory === 'rooms' && MOCK_ROOMS.map(room => (
                  <button
                    key={room.id}
                    onClick={() => goToRoomAvailability(room)}
                    className="bg-white border border-slate-200 p-4 rounded-xl text-left hover:border-red-300 hover:shadow-md transition-all group/btn"
                  >
                    <div className="font-bold text-slate-900 group-hover/btn:text-red-700 transition-colors">{room.id}</div>
                    <div className="text-sm text-slate-500 mt-1">{room.name}</div>
                  </button>
                ))}

                {(browseCategory === 'groups' && MOCK_GROUPS.filter(g => g.instId === selectedInstitute).length === 0) && (
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
  };

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
          <button onClick={handlePrint} className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">Print</button>
          <button onClick={handleExportICal} className="px-3 py-1.5 text-sm font-medium bg-red-700 text-white rounded-lg shadow-sm hover:bg-red-800 transition-colors">Export iCal</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {selectedGroup ? (<>Timetable: <span className="text-red-700">{selectedGroup.id}</span></>) : 
             selectedLecturer ? (<>Schedule: <span className="text-red-700">{selectedLecturer.name}</span></>) :
             selectedRoom ? (<>Availability: <span className="text-red-700">{selectedRoom.id}</span></>) : 'Timetable'}
          </h2>
          <p className="text-slate-500 mt-1">
            {selectedGroup ? selectedGroup.name : selectedLecturer ? `${selectedLecturer.instId} Institute` : selectedRoom ? selectedRoom.name : 'Unknown'} • Spring Semester 2026
          </p>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4">
            {WEEK_DAYS.map(day => {
              const events = selectedGroup 
                ? (MOCK_TIMETABLES[selectedGroup.id] || []) 
                : selectedLecturer 
                ? (Object.values(MOCK_TIMETABLES).flat().filter(e => e.lecturer.includes(selectedLecturer.id.charAt(0))))
                : selectedRoom
                ? (Object.values(MOCK_TIMETABLES).flat().filter(e => e.room === selectedRoom.id))
                : [];
              const dayEvents = events.filter((e: any) => e.day === day.id);
              return (
                <div key={day.id} className="min-h-[600px] flex flex-col">
                  {/* Day Header */}
                  <div className="bg-slate-100 rounded-t-xl p-3 text-center border border-slate-200 border-b-0">
                    <div className="font-bold text-slate-900">{day.name}</div>
                    <div className="text-sm text-slate-500">{day.date}</div>
                  </div>
                  {/* Day Body */}
                  <div className="bg-slate-50 border border-slate-200 rounded-b-xl p-2 grow flex flex-col gap-2">
                    {dayEvents.length === 0 ? (
                      <div className="text-xs text-slate-400 text-center py-4 font-medium italic">No classes</div>
                    ) : (
                      dayEvents.map((event: any) => (
                        <div key={event.id} className={`p-3 rounded-lg shadow-sm flex flex-col justify-between ${event.color} transition-transform hover:-translate-y-0.5 overflow-hidden`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold leading-none bg-white/60 px-2 py-1 rounded shadow-sm">{event.start} - {event.end}</span>
                          </div>
                          <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-2" title={event.title}>{event.title}</h4>
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
              );
            })}
          </div>
        </div>

        {/* Mobile Schedule List (shown on <md) */}
        <div className="md:hidden space-y-6">
          {WEEK_DAYS.map(day => {
            const events = selectedGroup 
              ? (MOCK_TIMETABLES[selectedGroup.id] || []) 
              : selectedLecturer 
              ? (Object.values(MOCK_TIMETABLES).flat().filter(e => e.lecturer.includes(selectedLecturer.id.charAt(0))))
              : selectedRoom
              ? (Object.values(MOCK_TIMETABLES).flat().filter(e => e.room === selectedRoom.id))
              : [];
            const dayEvents = events.filter((e: any) => e.day === day.id);
            if (dayEvents.length === 0) return null;
            return (
              <div key={day.id}>
                <h3 className="font-bold text-lg mb-3 flex items-center justify-between border-b pb-2">
                  <span>{day.name}</span>
                  <span className="text-sm font-normal text-slate-500">{day.date}</span>
                </h3>
                <div className="space-y-3">
                  {dayEvents.map((event: any) => (
                    <div key={event.id} className={`p-4 rounded-xl shadow-sm border ${event.color} overflow-hidden`}>
                      <div className="flex justify-between items-start mb-2 text-sm font-bold opacity-80">
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded">
                          <Clock className="w-4 h-4" />
                          {event.start} - {event.end}
                        </div>
                        <span className="uppercase text-[10px] tracking-wider bg-white/50 px-2 py-1 rounded">{event.type}</span>
                      </div>
                      <h4 className="font-bold text-base mb-3 line-clamp-2" title={event.title}>{event.title}</h4>
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
              <button onClick={handleInstructions} className="text-sm font-medium text-slate-600 hover:text-red-700 transition-colors">Instructions</button>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <Globe className="w-4 h-4" />
                {language}
              </button>
              <button onClick={() => showNotification("User profile coming soon!")} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors">
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
                  {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="text-slate-400">{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {(() => {
                  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
                  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
                  // Adjusting day index (0 is Sunday in JS, we want 0 as Monday)
                  const startOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
                  
                  return Array.from({ length: 42 }).map((_, i) => {
                    const dayNum = i - startOffset + 1;
                    const isOutside = dayNum <= 0 || dayNum > daysInMonth;
                    const dateObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum);
                    
                    // Check if this date is in the selected week
                    // Our "currentDate" marks the start of the week (Monday)
                    const monday = new Date(currentDate);
                    monday.setHours(0,0,0,0);
                    const sunday = new Date(monday);
                    sunday.setDate(monday.getDate() + 6);
                    sunday.setHours(23,59,59,999);
                    
                    const isSelectedWeek = !isOutside && dateObj >= monday && dateObj <= sunday;
                    const isToday = !isOutside && dateObj.toDateString() === new Date().toDateString();
                    
                    const handleDayClick = () => {
                      if (!isOutside) {
                        const newMonday = new Date(dateObj);
                        const dayInd = newMonday.getDay();
                        newMonday.setDate(dateObj.getDate() - (dayInd === 0 ? 6 : dayInd - 1));
                        setCurrentDate(newMonday);
                        showNotification(`Selected week: ${newMonday.toLocaleDateString()}`);
                      }
                    };
                    
                    return (
                      <button
                        key={i}
                        disabled={isOutside}
                        onClick={handleDayClick}
                        className={`py-2 rounded-lg text-sm transition-all focus:outline-none 
                          ${isOutside ? 'opacity-0 cursor-default' : 
                            isToday ? 'bg-red-700 text-white font-bold shadow-md' : 
                            isSelectedWeek ? 'bg-red-50 text-red-700 font-bold border border-red-100 ring-2 ring-red-100' : 
                            'hover:bg-slate-100 font-medium text-slate-700'}
                        `}
                      >
                        {!isOutside ? dayNum : ''}
                      </button>
                    )
                  });
                })()}
              </div>

              <button 
                onClick={() => {
                  const today = new Date();
                  setCurrentDate(new Date(today.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1))));
                  setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
                  showNotification("Calendar updated to today.");
                }} 
                className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Select Today
              </button>
            </div>

            {/* Quick Stats/Links */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 overflow-hidden relative shadow-md">
              <div className="relative z-10">
                <h3 className="font-bold mb-2 text-lg">Help Center</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">Need help navigating the new ASIO redesign system? Check the video tutorials.</p>
                <button onClick={handleInstructions} className="inline-flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white font-semibold text-sm transition-colors">
                  View Instructions
                  <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600 opacity-20 rounded-full blur-3xl"></div>
            </div>

            {/* Info block visible only in timetable view */}
            {view === 'TIMETABLE' && (selectedGroup || selectedLecturer || selectedRoom) && (
               <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm animate-in fade-in run-in-from-bottom duration-500">
                 <h3 className="font-bold text-emerald-800 mb-1">Details</h3>
                 <p className="text-emerald-700 text-sm mb-3">
                   Viewing schedule for <strong>{selectedGroup?.id || selectedLecturer?.name || selectedRoom?.id}</strong>.
                 </p>
                 <ul className="text-xs text-emerald-600 space-y-2 font-medium">
                   <li className="flex justify-between border-b border-emerald-100/50 pb-1"><span>Status:</span> <span>Active</span></li>
                   <li className="flex justify-between border-b border-emerald-100/50 pb-1"><span>Last Updated:</span> <span>Today</span></li>
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
            <button onClick={handleContactSupport} className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Contact Support</button>
            <button onClick={() => showNotification("Privacy Policy PDF...")} className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Privacy Policy</button>
            <button onClick={() => showNotification("Terms of Use PDF...")} className="text-slate-400 hover:text-red-700 text-xs uppercase tracking-widest font-bold transition-colors">Terms of Use</button>
          </div>
        </div>
      </footer>
      {/* --- Notification Toast --- */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-3 border border-slate-700">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="font-medium">{notification}</span>
        </div>
      )}
    </div>
  );
};

export default App;