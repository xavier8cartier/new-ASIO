"use client"

import React, { useState } from "react"
import {
  Search,
  MapPin,
  BookOpen,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  ArrowLeft,
  Clock,
  Filter,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react"

type Group = {
  id: string
  name: string
  instId: string
  majority?: string
}

type Lecturer = {
  id: string
  name: string
  instId: string
}

type Room = {
  id: string
  name: string
  building: string
}

type TimetableEvent = {
  id: number
  day: string
  start: string
  end: string
  title: string
  type: string
  room: string
  lecturer: string
  color: string
}

type SearchResult =
  | {
      id: string
      type: "Group"
      label: string
      subtitle: string
      value: Group
    }
  | {
      id: string
      type: "Lecturer"
      label: string
      subtitle: string
      value: Lecturer
    }
  | {
      id: string
      type: "Room"
      label: string
      subtitle: string
      value: Room
    }

// --- MOCK DATA ---
const MOCK_INSTITUTES = [
  { id: "SDT", name: "School of Digital Technologies" },
  { id: "BFM", name: "Baltic Film, Media and Arts School" },
  { id: "SEH", name: "School of Educational Sciences" },
  { id: "SOG", name: "School of Governance, Law and Society" },
]

const MOCK_GROUPS = [
  { id: "IFIFB-2", name: "IFIFB-2 - Informaatika", instId: "SDT" },
  { id: "IFIFB-1", name: "IFIFB-1 - Informaatika", instId: "SDT" },
  {
    id: "IFFIM-1",
    name: "IFFIM-1 - Inimese ja arvuti interaktsioon",
    instId: "SDT",
  },
  { id: "KOKOB-3", name: "KOKOB-3 - Ristmeedia", instId: "BFM" },
  { id: "RIAGM-1", name: "RIAGM-1 - Riigiteadused", instId: "SOG" },
  { id: "KAKOB-1", name: "KAKOB-1 - Kasvatusteadused", instId: "SEH" },
  {
    id: "HILAB_jpn-1",
    name: "Aasia uuringud (Jaapani uuringud) 1. õ.-a.",
    instId: "BFM",
  }, // Added
  { id: "KAANB-1", name: "Andragoogika 1. õ.-a.", instId: "SEH" },
  { id: "KOAB-1", name: "Ajakirjandus 1.õ.-a.", instId: "BFM" },
]

const MOCK_TIMETABLES: Record<string, TimetableEvent[]> = {
  "IFIFB-2": [
    {
      id: 1,
      day: "Mon",
      start: "10:15",
      end: "11:45",
      title: "IFI6071.DT Tarkvaratehnika [TA/DM]",
      type: "Loeng",
      room: "A-402",
      lecturer: "Mart Laanpere",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 2,
      day: "Mon",
      start: "12:15",
      end: "13:45",
      title: "IFI6071.DT Tarkvaratehnika [TA/DM]",
      type: "Praktikum",
      room: "A-402",
      lecturer: "Mart Laanpere",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
    {
      id: 3,
      day: "Mon",
      start: "16:15",
      end: "17:45",
      title: "IFI6066.DT Andmebaasid II [TA]",
      type: "Praktikum",
      room: "A-400",
      lecturer: "Ingrid Kool",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
    {
      id: 4,
      day: "Tue",
      start: "08:15",
      end: "09:45",
      title: "IFI6067.DT Kasutajaliidese esteetika [DM]",
      type: "Loeng",
      room: "A-325",
      lecturer: "David Murphy",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 5,
      day: "Tue",
      start: "10:15",
      end: "11:45",
      title: "IFI6067.DT Kasutajaliidese esteetika [DM]",
      type: "Seminar",
      room: "A-325",
      lecturer: "David Murphy",
      color: "bg-orange-50 border border-orange-200 text-orange-900",
    },
    {
      id: 6,
      day: "Wed",
      start: "14:15",
      end: "15:45",
      title: "Vabaaine",
      type: "Seminar",
      room: "M-218",
      lecturer: "Tanel Liiv",
      color: "bg-orange-50 border border-orange-200 text-orange-900",
    },
    {
      id: 7,
      day: "Thu",
      start: "12:15",
      end: "13:45",
      title: "IFI6069.DT Veebiprogrammeerimine [TA]",
      type: "Loeng",
      room: "S-244",
      lecturer: "Andrus Paadimeister",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 8,
      day: "Fri",
      start: "10:15",
      end: "13:45",
      title: "IFI6069.DT Veebiprogrammeerimine [TA]",
      type: "Praktikum",
      room: "S-244",
      lecturer: "Andrus Paadimeister",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
  ],
  "HILAB_jpn-1": [
    {
      id: 101,
      day: "Mon",
      start: "10:15",
      end: "11:45",
      title: "Jaapani keel A2 (HIL6402.HT)",
      type: "Loeng",
      room: "S-238",
      lecturer: "Akiko Masaki-Kadarik",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 102,
      day: "Mon",
      start: "14:15",
      end: "15:45",
      title: "Kriitiline mõtlemine (HIK6082.HT)",
      type: "Loeng",
      room: "A-002",
      lecturer: "Oliver Laas",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 103,
      day: "Tue",
      start: "10:15",
      end: "11:45",
      title: "Jaapani keel A2 (HIL6402.HT)",
      type: "Loeng",
      room: "S-238",
      lecturer: "Akiko Masaki-Kadarik",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 104,
      day: "Wed",
      start: "10:15",
      end: "11:45",
      title: "Jaapani keel A2 (HIL6402.HT)",
      type: "Loeng",
      room: "S-333",
      lecturer: "Maarja Yano",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 105,
      day: "Wed",
      start: "12:15",
      end: "13:45",
      title: "Jaapani uuem kultuur (HIL6599.HT)",
      type: "Loeng",
      room: "S-240",
      lecturer: "Alari Allik",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 106,
      day: "Thu",
      start: "10:15",
      end: "11:45",
      title: "Jaapani keel A2 (HIL6402.HT)",
      type: "Loeng",
      room: "S-333",
      lecturer: "Maarja Yano",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
  ],
  "KAANB-1": [
    {
      id: 201,
      day: "Mon",
      start: "18:00",
      end: "19:30",
      title: "Kriitiline mõtlemine (HIK6082.HT)",
      type: "Loeng",
      room: "A-002",
      lecturer: "Oliver Laas",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 202,
      day: "Tue",
      start: "08:15",
      end: "09:45",
      title: "Inglise keel B1.2 (LCE6324.HT)",
      type: "Loeng",
      room: "A-346",
      lecturer: "Aita Taiger",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 203,
      day: "Wed",
      start: "08:15",
      end: "09:45",
      title: "Inglise keel B1.2 (LCE6324.HT)",
      type: "Loeng",
      room: "A-346",
      lecturer: "Aita Taiger",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
  ],
  "KOAB-1": [
    {
      id: 301,
      day: "Mon",
      start: "12:15",
      end: "13:45",
      title: "Ajakirjandus ja ühiskond (KOA6003.FK)",
      type: "Loeng",
      room: "S-420",
      lecturer: "Andres Kõnno",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 302,
      day: "Mon",
      start: "14:15",
      end: "15:45",
      title: "Audiovisuaalne loojutustus (BFM6037.FK)",
      type: "Loeng",
      room: "S-420",
      lecturer: "Indrek Treufeldt",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 303,
      day: "Tue",
      start: "12:00",
      end: "15:00",
      title: "Ajakirjanduse eriala praktika infopäev",
      type: "Info",
      room: "A-222",
      lecturer: "Külli-Riin Tigasson",
      color: "bg-orange-50 border border-orange-200 text-orange-900",
    },
    {
      id: 304,
      day: "Wed",
      start: "08:15",
      end: "09:45",
      title: "Uudis (KOA6039.FK)",
      type: "Loeng",
      room: "M-225",
      lecturer: "Taavi Eilat",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 305,
      day: "Wed",
      start: "10:15",
      end: "11:45",
      title: "Erialane inglise keel I (LCE6511.HT)",
      type: "Loeng",
      room: "S-417",
      lecturer: "Helis Camara",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
    {
      id: 306,
      day: "Thu",
      start: "10:15",
      end: "11:45",
      title: "Erialane inglise keel I (LCE6511.HT)",
      type: "Loeng",
      room: "S-423",
      lecturer: "Helis Camara",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
    {
      id: 307,
      day: "Thu",
      start: "12:15",
      end: "13:45",
      title:
        "Maailma kommunikatsiooniajalugu ja Eesti ajakirjanduse ajalugu (KOA6053.FK)",
      type: "Loeng",
      room: "N-307",
      lecturer: "Priit Hõbemägi",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 308,
      day: "Thu",
      start: "14:15",
      end: "16:00",
      title: "AV tootmise alused (BFM6127.FK)",
      type: "Praktikum",
      room: "N-507",
      lecturer: "Tarmo Rajaleid",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
  ],
  "RIAGM-1": [
    {
      id: 401,
      day: "Mon",
      start: "10:15",
      end: "11:45",
      title: "Poliitiline teooria (RIA6001.YK)",
      type: "Loeng",
      room: "S-333",
      lecturer: "Peeter Selg",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
    {
      id: 402,
      day: "Tue",
      start: "12:15",
      end: "13:45",
      title: "Võrdlev poliitika (RIA6002.YK)",
      type: "Seminar",
      room: "S-423",
      lecturer: "Mari-Liis Jakobson",
      color: "bg-orange-50 border border-orange-200 text-orange-900",
    },
  ],
  "KAKOB-1": [
    {
      id: 501,
      day: "Wed",
      start: "08:15",
      end: "09:45",
      title: "Kasvatusfilosoofia (KAK6001.HT)",
      type: "Loeng",
      room: "M-225",
      lecturer: "Tiiu Kuurme",
      color: "bg-purple-50 border border-purple-200 text-purple-900",
    },
    {
      id: 502,
      day: "Wed",
      start: "10:15",
      end: "11:45",
      title: "Eripedagoogika alused (KAK6002.HT)",
      type: "Praktikum",
      room: "A-222",
      lecturer: "Lii Lilleoja",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
  ],
  "IFFIM-1": [
    {
      id: 601,
      day: "Mon",
      start: "12:15",
      end: "15:45",
      title: "Kasutajakeskne disain (IFI7016.DT)",
      type: "Praktikum",
      room: "A-402",
      lecturer: "David Murphy",
      color: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    },
    {
      id: 602,
      day: "Thu",
      start: "10:15",
      end: "11:45",
      title: "Uurimismeetodid (IFI7001.DT)",
      type: "Loeng",
      room: "S-244",
      lecturer: "Sonia Sousa",
      color: "bg-blue-50 border border-blue-200 text-blue-900",
    },
  ],
}

const WEEK_DAYS = [
  { id: "Mon", name: "Monday", date: "23.03" },
  { id: "Tue", name: "Tuesday", date: "24.03" },
  { id: "Wed", name: "Wednesday", date: "25.03" },
  { id: "Thu", name: "Thursday", date: "26.03" },
  { id: "Fri", name: "Friday", date: "27.03" },
]

type ViewMode = "HOME" | "BROWSE" | "TIMETABLE" | "GUIDE"

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mock data for lecturers
  const MOCK_LECTURERS = [
    { id: "MK", name: "Mart Laanpere", instId: "SDT" },
    { id: "IK", name: "Ingrid Kool", instId: "SDT" },
    { id: "DM", name: "David Murphy", instId: "SDT" },
    { id: "AP", name: "Andrus Paadimeister", instId: "SDT" },
    { id: "AA", name: "Alari Allik", instId: "BFM" },
    { id: "TE", name: "Taavi Eilat", instId: "BFM" },
    { id: "OL", name: "Oliver Laas", instId: "HITI" },
    { id: "AK", name: "Andres Kõnno", instId: "BFM" },
    { id: "IT", name: "Indrek Treufeldt", instId: "BFM" },
  ]

  // Mock data for rooms
  const MOCK_ROOMS = [
    { id: "A-402", name: "A-402 - Computer Lab", building: "A" },
    { id: "A-325", name: "A-325 - Seminar Room", building: "A" },
    { id: "S-244", name: "S-244 - Lecture Hall", building: "S" },
    { id: "M-218", name: "M-218 - Terra Building", building: "M" },
    { id: "N-307", name: "N-307 - Nova Building", building: "N" },
    { id: "S-333", name: "S-333 - Auditoorium", building: "S" },
    { id: "A-002", name: "A-002 - Maximus", building: "A" },
    { id: "M-225", name: "M-225 - Terra", building: "M" },
  ]

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 23)) // March 23, 2026
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)) // Display month

  // Navigation State
  const [view, setView] = useState<ViewMode>("HOME")
  const [browseCategory, setBrowseCategory] = useState<string | null>(null)
  const [selectedInstitute, setSelectedInstitute] = useState<string>("SDT")
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  )
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [notification, setNotification] = useState<string | null>(null)
  const [browsePage, setBrowsePage] = useState(1)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [isCompareMode, setIsCompareMode] = useState(false)
  const ITEMS_PER_PAGE = 6

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const searchResults: SearchResult[] =
    normalizedSearchQuery.length > 0
      ? [
          ...MOCK_GROUPS.filter(
            (g) =>
              g.id.toLowerCase().includes(normalizedSearchQuery) ||
              g.name.toLowerCase().includes(normalizedSearchQuery) ||
              g.instId.toLowerCase().includes(normalizedSearchQuery)
          ).map((g) => ({
            id: g.id,
            type: "Group" as const,
            label: g.name,
            subtitle: `Group ${g.id}`,
            value: g,
          })),
          ...MOCK_LECTURERS.filter(
            (l) =>
              l.id.toLowerCase().includes(normalizedSearchQuery) ||
              l.name.toLowerCase().includes(normalizedSearchQuery) ||
              l.instId.toLowerCase().includes(normalizedSearchQuery)
          ).map((l) => ({
            id: l.id,
            type: "Lecturer" as const,
            label: l.name,
            subtitle: `Lecturer ${l.id}`,
            value: l,
          })),
          ...MOCK_ROOMS.filter(
            (r) =>
              r.id.toLowerCase().includes(normalizedSearchQuery) ||
              r.name.toLowerCase().includes(normalizedSearchQuery)
          ).map((r) => ({
            id: r.id,
            type: "Room" as const,
            label: r.name,
            subtitle: `Room ${r.id}`,
            value: r,
          })),
        ]
      : MOCK_GROUPS.slice(0, 5).map((g) => ({
          id: g.id,
          type: "Group" as const,
          label: g.name,
          subtitle: `Group ${g.id}`,
          value: g,
        }))

  const categories = [
    {
      id: "curricula",
      title: "Curricula / Courses",
      icon: <BookOpen className="h-6 w-6" />,
      desc: "Search and filter by subject codes or names.",
    },
    {
      id: "groups",
      title: "Study Groups",
      icon: <Users className="h-6 w-6" />,
      desc: "Timetables for specific study groups.",
    },
    {
      id: "teachers",
      title: "Lecturer Schedules",
      icon: <User className="h-6 w-6" />,
      desc: "Find individual teaching staff timetables.",
    },
    {
      id: "rooms",
      title: "Room Availability",
      icon: <MapPin className="h-6 w-6" />,
      desc: "Check room bookings across campus buildings.",
    },
  ]

  // Navigation Handlers
  const goHome = () => {
    setView("HOME")
    setBrowseCategory(null)
    setSelectedGroup(null)
    setSelectedLecturer(null)
    setSelectedRoom(null)
    setSearchQuery("")
  }

  const goToBrowse = (catId: string) => {
    setBrowseCategory(catId)
    setView("BROWSE")
  }

  const goToTimetable = (group: Group) => {
    setSelectedGroup(group)
    setSelectedLecturer(null)
    setSelectedRoom(null)
    setView("TIMETABLE")
  }

  const goToLecturerSchedule = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer)
    setSelectedGroup(null)
    setSelectedRoom(null)
    setView("TIMETABLE")
  }

  const goToRoomAvailability = (room: Room) => {
    setSelectedRoom(room)
    setSelectedGroup(null)
    setSelectedLecturer(null)
    setView("TIMETABLE")
  }

  const goToGuide = () => {
    setView("GUIDE")
  }

  const executeSearchResult = (result: SearchResult) => {
    setSearchQuery(result.label)
    switch (result.type) {
      case "Group":
        goToTimetable(result.value as Group)
        break
      case "Lecturer":
        goToLecturerSchedule(result.value as Lecturer)
        break
      case "Room":
        goToRoomAvailability(result.value as Room)
        break
    }
    setIsMenuOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedValue = searchQuery.trim().toLowerCase()
    if (normalizedValue.length === 0) {
      return
    }

    const foundGroup = MOCK_GROUPS.find(
      (g) => g.id.toLowerCase() === normalizedValue
    )
    if (foundGroup) {
      goToTimetable(foundGroup)
      return
    }

    const foundLecturer = MOCK_LECTURERS.find(
      (l) =>
        l.id.toLowerCase() === normalizedValue ||
        l.name.toLowerCase().includes(normalizedValue)
    )
    if (foundLecturer) {
      goToLecturerSchedule(foundLecturer)
      return
    }

    const foundRoom = MOCK_ROOMS.find(
      (r) =>
        r.id.toLowerCase() === normalizedValue ||
        r.name.toLowerCase().includes(normalizedValue)
    )
    if (foundRoom) {
      goToRoomAvailability(foundRoom)
      return
    }

    showNotification(`No result found for "${searchQuery}"`)
  }

  const handleQuickSearchClick = (groupId: string) => {
    const foundGroup = MOCK_GROUPS.find((g) => g.id === groupId)
    if (foundGroup) {
      setSearchQuery(groupId)
      goToTimetable(foundGroup)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExportICal = (type: "APPLE" | "GOOGLE") => {
    if (type === "GOOGLE") {
      showNotification("Opening Google Calendar... Syncing events.")
    } else {
      showNotification("Generating iCal file... Download will start shortly.")
    }
    setShowExportMenu(false)
  }

  const handleInstructions = () => {
    setView("GUIDE")
  }

  const handleContactSupport = () => {
    showNotification("Redirecting to support portal...")
  }

  // View renders
  const renderHomeContent = () => {
    return (
    <div className="animate-in space-y-8 duration-500 fade-in slide-in-from-bottom-4">
      {/* Hero / Search Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="relative z-10">
          <h2 className="mb-2 text-2xl font-bold">
            How can we help you today?
          </h2>
          <p className="mb-6 text-slate-500">
            Search for rooms, lecturers, or study groups to see their specific
            schedules.
          </p>

          <form onSubmit={handleSearchSubmit} className="group relative">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-red-600" />
            <input
              type="text"
              placeholder="e.g. Informaatika, A-402, David Murphy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pr-4 pl-12 text-lg transition-all outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
            
            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-xs text-slate-400">Press Enter to see all results</span>
              <button 
                type="button"
                onClick={goToGuide}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Don't know the abbreviation? View Guide
              </button>
            </div>

            {searchQuery.trim().length > 0 && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        type="button"
                        onClick={() => executeSearchResult(result)}
                        className="w-full border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-red-50"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-slate-900 group-hover:text-red-700">
                            {result.label}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                            {result.type}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {result.subtitle}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <Search className="mx-auto mb-2 h-8 w-8 text-slate-200" />
                      <p className="text-sm text-slate-500">No matches found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Quick Search:
              </span>
              <button
                onClick={() => handleQuickSearchClick("IFIFB-2")}
                className="rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-700"
              >
                IFIFB-2
              </button>
              <button
                onClick={() => handleQuickSearchClick("KOAB-1")}
                className="rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-700"
              >
                KOAB-1
              </button>
              <button
                onClick={() => handleQuickSearchClick("HILAB_jpn-1")}
                className="rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-xs font-medium transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-700"
              >
                HILAB_jpn-1
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs tracking-wider text-slate-400 uppercase">
                Suggested programs
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_GROUPS.slice(0, 6).map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleQuickSearchClick(group.id)}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-left text-sm transition-all hover:border-red-300 hover:shadow-sm"
                  >
                    <div className="font-semibold text-slate-900">
                      {group.id}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {group.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Grid */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => goToBrowse(cat.id)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-red-200 hover:shadow-md"
          >
            <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-red-50 group-hover:text-red-700">
              {cat.icon}
            </div>
            <h3 className="relative z-10 mb-1 text-lg font-bold">
              {cat.title}
            </h3>
            <p className="relative z-10 text-sm text-slate-500">{cat.desc}</p>
          </button>
        ))}
      </section>

      {/* Security Alert Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        <div className="rounded-full bg-blue-200 p-1.5">
          <AlertCircle className="h-4 w-4" />
        </div>
        <span>
          Connection is secure. All timetable data is encrypted via SSL.
        </span>
      </div>
    </div>
    )
  }

  const renderBrowseContent = () => {
    const titleMap: Record<string, string> = {
      groups: "Browse Study Groups",
      teachers: "Find Lecturers",
      rooms: "Check Rooms",
      curricula: "Curricula / Courses",
    }

    const filteredItems = browseCategory === "groups" 
      ? MOCK_GROUPS.filter((g) => g.instId === selectedInstitute)
      : browseCategory === "teachers"
        ? MOCK_LECTURERS.filter((l) => l.instId === selectedInstitute)
        : MOCK_ROOMS

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
    const paginatedItems = filteredItems.slice((browsePage - 1) * ITEMS_PER_PAGE, browsePage * ITEMS_PER_PAGE)

    return (
      <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-right-8">
        <button
          onClick={goHome}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-red-700"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Filter className="h-6 w-6 text-slate-400" />
                {browseCategory ? titleMap[browseCategory] : "Browse"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select an item below to see its specific schedule.
              </p>
            </div>
          </div>

          <div className="grid min-h-100 grid-cols-1 md:grid-cols-12">
            {/* Left Pane: Categories/Institutes */}
            <div className="border-r border-slate-100 bg-white md:col-span-4">
              <h3 className="px-6 pt-6 pb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                Institutes
              </h3>
              <ul className="pb-4">
                {MOCK_INSTITUTES.map((inst) => (
                  <li key={inst.id}>
                    <button
                      onClick={() => { setSelectedInstitute(inst.id); setBrowsePage(1); }}
                      className={`w-full border-l-4 px-6 py-3 text-left text-sm font-medium transition-colors ${
                        selectedInstitute === inst.id
                          ? "border-red-700 bg-red-50 text-red-700"
                          : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {inst.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Pane: Items View */}
            <div className="flex flex-col bg-slate-50 p-6 md:col-span-8">
              <div className="grow">
                <h3 className="mb-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                  {browseCategory === "groups"
                    ? "Available Groups"
                    : browseCategory === "teachers"
                      ? "Found Lecturers"
                      : "Campus Rooms"}
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {browseCategory === "groups" &&
                    paginatedItems.map((group) => (
                        <button
                          key={(group as Group).id}
                          onClick={() => goToTimetable(group as Group)}
                          className="group/btn rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md"
                        >
                          <div className="font-bold text-slate-900 transition-colors group-hover/btn:text-red-700">
                            {(group as Group).id}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {(group as Group).name}
                          </div>
                        </button>
                    ))}

                  {browseCategory === "teachers" &&
                    paginatedItems.map((lecturer) => (
                      <button
                        key={(lecturer as Lecturer).id}
                        onClick={() => goToLecturerSchedule(lecturer as Lecturer)}
                        className="group/btn rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md"
                      >
                        <div className="font-bold text-slate-900 transition-colors group-hover/btn:text-red-700">
                          {(lecturer as Lecturer).name}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {(lecturer as Lecturer).id} • Room A-402
                        </div>
                      </button>
                    ))}

                  {browseCategory === "rooms" &&
                    paginatedItems.map((room) => (
                      <button
                        key={(room as Room).id}
                        onClick={() => goToRoomAvailability(room as Room)}
                        className="group/btn rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md"
                      >
                        <div className="font-bold text-slate-900 transition-colors group-hover/btn:text-red-700">
                          {(room as Room).id}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {(room as Room).name}
                        </div>
                      </button>
                    ))}

                  {filteredItems.length === 0 && (
                    <div className="col-span-full py-10 text-center text-slate-400">
                      <Users className="mx-auto mb-3 h-10 w-10 opacity-20" />
                      <p>No items found for this selection.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-200 pt-6">
                  <button
                    disabled={browsePage === 1}
                    onClick={() => setBrowsePage(browsePage - 1)}
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm font-medium text-slate-600">
                    Page {browsePage} of {totalPages}
                  </span>
                  <button
                    disabled={browsePage === totalPages}
                    onClick={() => setBrowsePage(browsePage + 1)}
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-30"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderGuideContent = () => {
    return (
    <div className="animate-in space-y-8 duration-500 fade-in slide-in-from-right-8">
      <button
        onClick={goHome}
        className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-red-700"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-900">User Guide & Instructions</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="mb-3 text-lg font-bold text-slate-800">1. Searching for Schedules</h3>
            <p className="text-slate-600">You can use the search bar on the home page to find groups, lecturers, or rooms. Try typing keywords like "Informaatika" to see all related study groups.</p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-bold text-slate-800">2. Understanding Abbreviations</h3>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 font-bold text-slate-700">Code</th>
                    <th className="pb-2 font-bold text-slate-700">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr><td className="py-2 font-mono font-bold text-red-700">IFIFB</td><td className="py-2">Informaatika (Bakalauruseõpe)</td></tr>
                  <tr><td className="py-2 font-mono font-bold text-red-700">KOAB</td><td className="py-2">Ajakirjandus (Bakalauruseõpe)</td></tr>
                  <tr><td className="py-2 font-mono font-bold text-red-700">HILAB</td><td className="py-2">Aasia uuringud (Bakalauruseõpe)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-bold text-slate-800">3. Calendar Integration</h3>
            <p className="text-slate-600">Click the "Export to Calendar" button in any timetable view to sync with your device. We support both Apple Calendar (iCal) and Google Calendar (Android).</p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-bold text-slate-800">4. Comparison Mode</h3>
            <p className="text-slate-600 italic">Coming Soon: You will be able to overlay multiple schedules to find free slots for elective courses.</p>
          </section>
        </div>
      </div>
    </div>
    )
  }

  const renderTimetableContent = () => {
    return (
    <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button
          onClick={goHome}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-red-700"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
        <div className="relative flex gap-2">
          <button
            onClick={handlePrint}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            Print
          </button>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-800"
            >
              Export to Calendar
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <button
                  onClick={() => handleExportICal("APPLE")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                >
                  Apple Calendar (iOS)
                </button>
                <button
                  onClick={() => handleExportICal("GOOGLE")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                >
                  Google Calendar (Android)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {selectedGroup ? (
                  <>
                    Timetable:{" "}
                    <span className="text-red-700">{selectedGroup.id}</span>
                    <span className="ml-3 rounded-full bg-slate-100 px-2 py-1 text-xs tracking-[0.25em] text-slate-600 uppercase">
                      {selectedGroup.name}
                    </span>
                  </>
                ) : selectedLecturer ? (
                  <>
                    Schedule:{" "}
                    <span className="text-red-700">{selectedLecturer.name}</span>
                  </>
                ) : selectedRoom ? (
                  <>
                    Availability:{" "}
                    <span className="text-red-700">{selectedRoom.id}</span>
                  </>
                ) : (
                  "Timetable"
                )}
              </h2>
              <p className="mt-1 text-slate-500">
                {selectedGroup
                  ? selectedGroup.name
                  : selectedLecturer
                    ? `${selectedLecturer.instId} Institute`
                    : selectedRoom
                      ? selectedRoom.name
                      : "Unknown"}{" "}
                • Spring Semester 2026
              </p>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium transition-all hover:bg-slate-100">
                <input 
                  type="checkbox" 
                  checked={isCompareMode} 
                  onChange={(e) => {
                    setIsCompareMode(e.target.checked);
                    if (e.target.checked) showNotification("Comparison mode active: Your schedule overlayed.");
                  }}
                  className="h-4 w-4 rounded border-slate-300 text-red-700 focus:ring-red-500" 
                />
                Compare with mine
              </label>
            </div>
          </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4">
            {WEEK_DAYS.map((day) => {
              const events = selectedGroup
                ? MOCK_TIMETABLES[selectedGroup.id] || []
                : selectedLecturer
                  ? Object.values(MOCK_TIMETABLES)
                      .flat()
                      .filter((e) =>
                        e.lecturer.includes(selectedLecturer.id.charAt(0))
                      )
                  : selectedRoom
                    ? Object.values(MOCK_TIMETABLES)
                        .flat()
                        .filter((e) => e.room === selectedRoom.id)
                    : []
              const dayEvents = events.filter((e) => e.day === day.id)
              return (
                <div key={day.id} className="flex min-h-150 flex-col">
                  {/* Day Header */}
                  <div className="rounded-t-xl border border-b-0 border-slate-200 bg-slate-100 p-3 text-center">
                    <div className="font-bold text-slate-900">{day.name}</div>
                    <div className="text-sm text-slate-500">{day.date}</div>
                  </div>
                  {/* Day Body */}
                  <div className="flex grow flex-col gap-2 rounded-b-xl border border-slate-200 bg-slate-50 p-2">
                    {dayEvents.length === 0 && !isCompareMode ? (
                      <div className="py-4 text-center text-xs font-medium text-slate-400 italic">
                        No classes
                      </div>
                    ) : (
                      <>
                        {isCompareMode && day.id === "Mon" && (
                          <div className="mb-2 rounded-lg border-2 border-dashed border-red-200 bg-red-50/50 p-2 opacity-60">
                             <div className="mb-1 text-[10px] font-bold text-red-400 uppercase tracking-tight">Your Schedule</div>
                             <div className="text-xs font-bold text-red-700">My Elective Course</div>
                             <div className="text-[10px] text-red-500">08:15 - 09:45</div>
                          </div>
                        )}
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`flex flex-col justify-between rounded-lg p-3 shadow-sm ${event.color} overflow-hidden transition-transform hover:-translate-y-0.5`}
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <span className="whitespace-nowrap rounded bg-white/60 px-2 py-1 text-xs leading-none font-bold shadow-sm">
                                {event.start} - {event.end}
                              </span>
                            </div>
                            <h4
                              className="mb-1 text-sm leading-tight font-bold break-words"
                              style={{ hyphens: "auto" }}
                              title={event.title}
                            >
                              {event.title}
                            </h4>
                            <div className="mb-3">
                              <span className="inline-block rounded-md bg-white/60 px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                                {event.type}
                              </span>
                            </div>

                            <div className="mt-auto space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-medium">
                                <MapPin className="h-3 w-3" />
                                {event.room}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-medium">
                                <User className="h-3 w-3" />
                                {event.lecturer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Schedule List (shown on <md) */}
        <div className="space-y-6 md:hidden">
          {WEEK_DAYS.map((day) => {
            const events = selectedGroup
              ? MOCK_TIMETABLES[selectedGroup.id] || []
              : selectedLecturer
                ? Object.values(MOCK_TIMETABLES)
                    .flat()
                    .filter((e) =>
                      e.lecturer.includes(selectedLecturer.id.charAt(0))
                    )
                : selectedRoom
                  ? Object.values(MOCK_TIMETABLES)
                      .flat()
                      .filter((e) => e.room === selectedRoom.id)
                  : []
            const dayEvents = events.filter((e) => e.day === day.id)
            if (dayEvents.length === 0) return null
            return (
              <div key={day.id}>
                <h3 className="mb-3 flex items-center justify-between border-b pb-2 text-lg font-bold">
                  <span>{day.name}</span>
                  <span className="text-sm font-normal text-slate-500">
                    {day.date}
                  </span>
                </h3>
                <div className="space-y-3">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-xl border p-4 shadow-sm ${event.color} overflow-hidden`}
                    >
                      <div className="mb-2 flex items-start justify-between text-sm font-bold opacity-80">
                        <div className="flex items-center gap-1.5 rounded bg-white/50 px-2 py-1">
                          <Clock className="h-4 w-4" />
                          {event.start} - {event.end}
                        </div>
                        <span className="rounded bg-white/50 px-2 py-1 text-[10px] tracking-wider uppercase">
                          {event.type}
                        </span>
                      </div>
                      <h4
                        className="mb-3 text-base font-bold break-words"
                        style={{ hyphens: "auto" }}
                        title={event.title}
                      >
                        {event.title}
                      </h4>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {event.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" /> {event.lecturer}
                        </span>
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
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Top Navigation --- */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={goHome}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-700 font-bold text-white shadow-md">
                TÜ
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg leading-none font-bold text-slate-900">
                  TALLINNA ÜLIKOOL
                </h1>
                <p className="text-xs text-slate-500">
                  Timetable & Room System
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-6 md:flex">
              <button
                onClick={goHome}
                className={`text-sm font-medium transition-colors ${view === "HOME" ? "text-red-700" : "text-slate-600 hover:text-red-700"}`}
              >
                Home
              </button>
              <button
                onClick={handleInstructions}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-red-700"
              >
                Instructions
              </button>
              <div className="mx-2 h-4 w-px bg-slate-200" />
              <button
                onClick={() => showNotification("User profile coming soon!")}
                className="rounded-full bg-slate-100 p-2 transition-colors hover:bg-slate-200"
              >
                <User className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-slate-600 focus:outline-none md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="space-y-1 border-t border-slate-200 px-2 py-3 md:hidden">
              <button
                onClick={() => { goHome(); setIsMenuOpen(false); }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700"
              >
                Home
              </button>
              <button
                onClick={() => { goToBrowse("groups"); setIsMenuOpen(false); }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700"
              >
                Browse Study Groups
              </button>
              <button
                onClick={() => { goToBrowse("teachers"); setIsMenuOpen(false); }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700"
              >
                Browse Lecturers
              </button>
              <button
                onClick={() => { goToBrowse("rooms"); setIsMenuOpen(false); }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700"
              >
                Browse Rooms
              </button>
              <button
                onClick={() => { handleInstructions(); setIsMenuOpen(false); }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700"
              >
                Instructions
              </button>
            </div>
          )}
        </div>
      </nav>



      {/* --- Main Content --- */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Dynamically Rendered Content Area */}
          <div className="lg:col-span-8">
            {view === "HOME" && renderHomeContent()}
            {view === "BROWSE" && renderBrowseContent()}
            {view === "TIMETABLE" && renderTimetableContent()}
            {view === "GUIDE" && renderGuideContent()}
          </div>

          {/* Right Column: Persistent Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Compact Calendar */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold">
                  <Calendar className="h-5 w-5 text-red-700" />
                  {viewDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setViewDate(
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth() - 1,
                          1
                        )
                      )
                    }
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setViewDate(
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth() + 1,
                          1
                        )
                      )
                    }
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wider uppercase">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                  <div key={i} className="text-slate-400">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {(() => {
                  const daysInMonth = new Date(
                    viewDate.getFullYear(),
                    viewDate.getMonth() + 1,
                    0
                  ).getDate()
                  const firstDayOfMonth = new Date(
                    viewDate.getFullYear(),
                    viewDate.getMonth(),
                    1
                  ).getDay()
                  // Adjusting day index (0 is Sunday in JS, we want 0 as Monday)
                  const startOffset =
                    firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

                  return Array.from({ length: 42 }).map((_, i) => {
                    const dayNum = i - startOffset + 1
                    const isOutside = dayNum <= 0 || dayNum > daysInMonth
                    const dateObj = new Date(
                      viewDate.getFullYear(),
                      viewDate.getMonth(),
                      dayNum
                    )

                    // Check if this date is in the selected week
                    // Our "currentDate" marks the start of the week (Monday)
                    const monday = new Date(currentDate)
                    monday.setHours(0, 0, 0, 0)
                    const sunday = new Date(monday)
                    sunday.setDate(monday.getDate() + 6)
                    sunday.setHours(23, 59, 59, 999)

                    const isSelectedWeek =
                      !isOutside && dateObj >= monday && dateObj <= sunday
                    const isToday =
                      !isOutside &&
                      dateObj.toDateString() === new Date().toDateString()

                    const handleDayClick = () => {
                      if (!isOutside) {
                        const newMonday = new Date(dateObj)
                        const dayInd = newMonday.getDay()
                        newMonday.setDate(
                          dateObj.getDate() - (dayInd === 0 ? 6 : dayInd - 1)
                        )
                        setCurrentDate(newMonday)
                        showNotification(
                          `Selected week: ${newMonday.toLocaleDateString()}`
                        )
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={isOutside}
                        onClick={handleDayClick}
                        className={`rounded-lg py-2 text-sm transition-all focus:outline-none ${
                          isOutside
                            ? "cursor-default opacity-0"
                            : isToday
                              ? "bg-red-700 font-bold text-white shadow-md"
                              : isSelectedWeek
                                ? "border border-red-100 bg-red-50 font-bold text-red-700 ring-2 ring-red-100"
                                : "font-medium text-slate-700 hover:bg-slate-100"
                        } `}
                      >
                        {!isOutside ? dayNum : ""}
                      </button>
                    )
                  })
                })()}
              </div>

              <button
                onClick={() => {
                  const today = new Date()
                  setCurrentDate(
                    new Date(
                      today.setDate(
                        today.getDate() -
                          (today.getDay() === 0 ? 6 : today.getDay() - 1)
                      )
                    )
                  )
                  setViewDate(
                    new Date(today.getFullYear(), today.getMonth(), 1)
                  )
                  showNotification("Calendar updated to today.")
                }}
                className="mt-6 w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Select Today
              </button>
            </div>

            {/* Quick Stats/Links */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-md">
              <div className="relative z-10">
                <h3 className="mb-2 text-lg font-bold">Help Center</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                  Need help navigating the new ASIO redesign system? Check the
                  video tutorials.
                </p>
                <button
                  onClick={handleInstructions}
                  className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  View Instructions
                  <ChevronRight className="ml-1 h-4 w-4 opacity-70" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-red-600 opacity-20 blur-3xl"></div>
            </div>

            {/* Info block visible only in timetable view */}
            {view === "TIMETABLE" &&
              (selectedGroup || selectedLecturer || selectedRoom) && (
                <div className="run-in-from-bottom animate-in rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm duration-500 fade-in">
                  <h3 className="mb-1 font-bold text-emerald-800">Details</h3>
                  <p className="mb-3 text-sm text-emerald-700">
                    Viewing schedule for{" "}
                    <strong>
                      {selectedGroup?.id ||
                        selectedLecturer?.name ||
                        selectedRoom?.id}
                    </strong>
                    .
                  </p>
                  <ul className="space-y-2 text-xs font-medium text-emerald-600">
                    <li className="flex justify-between border-b border-emerald-100/50 pb-1">
                      <span>Status:</span> <span>Active</span>
                    </li>
                    <li className="flex justify-between border-b border-emerald-100/50 pb-1">
                      <span>Last Updated:</span> <span>Today</span>
                    </li>
                  </ul>
                </div>
              )}
          </aside>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 opacity-50 grayscale">
            <span className="font-bold text-slate-500">TÜ</span>
          </div>
          <p className="mb-4 text-sm text-slate-500">
            New modern view prototype for{" "}
            <span className="font-semibold text-slate-800">
              Kasutajaliidese Esteetika
            </span>{" "}
            project.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={handleContactSupport}
              className="text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-red-700"
            >
              Contact Support
            </button>
            <button
              onClick={() => showNotification("Privacy Policy PDF...")}
              className="text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-red-700"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showNotification("Terms of Use PDF...")}
              className="text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-red-700"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </footer>
      {/* --- Notification Toast --- */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 z-100 flex -translate-x-1/2 animate-in items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-white shadow-2xl duration-300 fade-in slide-in-from-bottom-4">
          <Info className="h-5 w-5 text-blue-400" />
          <span className="font-medium">{notification}</span>
        </div>
      )}
    </div>
  )
}

export default App
