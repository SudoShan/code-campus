import React, { useState } from "react";
import ExploreRoomCard from "../components/ExploreRoomCard";
import { rooms } from "./RoomsPage";
import { FaSortAlphaDown, FaSortNumericDown, FaStar, FaSearch } from "react-icons/fa";

// Collect all unique technologies
const allTechnologies = Array.from(
  new Set(rooms.flatMap(r => r.technologies))
).sort();

const userCountOptions = [
  { label: "> 1,000", value: 1000 },
  { label: "> 10,000", value: 10000 },
  { label: "> 1,000,000", value: 1000000 },
];

const sortOptions = [
  { label: "Rating", value: "rating", icon: <FaStar style={{ color: '#facc15' }} /> },
  { label: "User Count", value: "userCount", icon: <FaSortNumericDown style={{ color: '#facc15' }} /> },
  { label: "Alphabet", value: "alphabet", icon: <FaSortAlphaDown style={{ color: '#facc15' }} /> },
];

export default function ExplorePage() {
  const [showPrivate, setShowPrivate] = useState(true);
  const [showPublic, setShowPublic] = useState(true);
  const [userCountFilter, setUserCountFilter] = useState(0);
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  // Filtering logic
  const filteredRooms = rooms.filter(room => {
    if (!showPrivate && room.isPrivate) return false;
    if (!showPublic && !room.isPrivate) return false;
    if (userCountFilter && room.userCount < userCountFilter) return false;
    // OR logic for tech filters
    if (techFilters.length > 0 && !room.technologies.some(t => techFilters.includes(t))) return false;
    // Search filter
    if (search.trim() &&
      !room.roomname.toLowerCase().includes(search.trim().toLowerCase()) &&
      !room.desc.toLowerCase().includes(search.trim().toLowerCase())
    ) return false;
    return true;
  });

  // Sorting logic
  if (sortBy === "rating") {
    filteredRooms.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "userCount") {
    filteredRooms.sort((a, b) => b.userCount - a.userCount);
  } else if (sortBy === "alphabet") {
    filteredRooms.sort((a, b) => a.roomname.localeCompare(b.roomname));
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: '#18181b', overflow: 'hidden' }}>
      {/* Left Filters */}
      <aside
        style={{
          width: 220,
          background: "rgba(24,24,27,0.85)",
          backdropFilter: "blur(8px)",
          padding: 18,
          color: "#fff",
          borderRight: "1px solid #333",
          position: "fixed",
          left: 0,
          top: 60,
          height: "calc(100vh - 60px)",
          zIndex: 10,
          overflowY: "auto"
        }}
        className="hide-scrollbar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Filters</h3>
          <button
            style={{
              background: '#232323',
              color: '#facc15',
              border: '1px solid #444',
              borderRadius: 8,
              padding: '2px 8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 11
            }}
            onClick={() => {
              setShowPrivate(true);
              setShowPublic(true);
              setUserCountFilter(0);
              setTechFilters([]);
            }}
          >
            Reset
          </button>
        </div>
        {/* Private/Public */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>Visibility</div>
          <label style={{ display: "flex", alignItems: 'center', marginBottom: 2, fontSize: 12, cursor: 'pointer', gap: 5 }}>
            <input type="checkbox" checked={showPrivate} onChange={e => setShowPrivate(e.target.checked)}
              style={{ accentColor: '#facc15', width: 12, height: 12, marginRight: 2 }} /> Private
          </label>
          <label style={{ display: "flex", alignItems: 'center', fontSize: 12, cursor: 'pointer', gap: 5 }}>
            <input type="checkbox" checked={showPublic} onChange={e => setShowPublic(e.target.checked)}
              style={{ accentColor: '#facc15', width: 12, height: 12, marginRight: 2 }} /> Public
          </label>
        </div>
        {/* User Count */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>User Count</div>
          {userCountOptions.map(opt => (
            <label key={opt.value} style={{ display: "flex", alignItems: 'center', marginBottom: 1, fontSize: 12, cursor: 'pointer', gap: 5 }}>
              <input
                type="radio"
                name="userCount"
                checked={userCountFilter === opt.value}
                onChange={() => setUserCountFilter(opt.value)}
                style={{ accentColor: '#facc15', width: 12, height: 12, marginRight: 2 }}
              /> {opt.label}
            </label>
          ))}
          <label style={{ display: "flex", alignItems: 'center', marginTop: 1, fontSize: 12, cursor: 'pointer', gap: 5 }}>
            <input
              type="radio"
              name="userCount"
              checked={userCountFilter === 0}
              onChange={() => setUserCountFilter(0)}
              style={{ accentColor: '#facc15', width: 12, height: 12, marginRight: 2 }}
            /> Any
          </label>
        </div>
        {/* Technologies */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>Technologies</div>
          <div>
            {allTechnologies.map(tech => (
              <label key={tech as string} style={{ display: "flex", alignItems: 'center', marginBottom: 1, fontSize: 12, cursor: 'pointer', gap: 5 }}>
                <input
                  type="checkbox"
                  checked={techFilters.includes(tech as string)}
                  onChange={e => {
                    setTechFilters(f =>
                      e.target.checked
                        ? [...f, tech as string]
                        : f.filter(t => t !== tech)
                    );
                  }}
                  style={{ accentColor: '#facc15', width: 12, height: 12, marginRight: 2 }}
                /> {tech}
              </label>
            ))}
          </div>
        </div>
      </aside>
      {/* Right: Results */}
      <main style={{ flex: 1, padding: 36, paddingLeft: 260, height: 'calc(100vh - 60px)', overflowY: 'auto', boxSizing: 'border-box', position: 'relative', marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 28, color: "#fff", margin: 0 }}>Explore</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FaSearch style={{ position: 'absolute', left: 10, top: 8, color: '#e5e7eb', fontSize: 16, pointerEvents: 'none' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
                placeholder="Search rooms..."
                style={{
                  padding: '3px 12px 3px 32px',
                  borderRadius: 8,
                  border: '1px solid #444',
                  background: '#232323',
                  color: '#fff',
                  fontSize: 15,
                  outline: 'none',
                  boxShadow: searchActive ? '0 0px 0 2px #facc15' : 'none',
                  transition: 'box-shadow 0.18s',
                  width: 250
                }}
              />
            </div>
            <span style={{ color: "#e5e7eb", fontWeight: 500, fontSize: 15, marginRight: 4 }}>Sort by</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ background: "#232323", color: "#fff", border: "1px solid #444", borderRadius: 8, padding: "4px 12px", fontWeight: 600 }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {sortOptions.find(opt => opt.value === sortBy)?.icon}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {filteredRooms.length === 0 && (
            <div style={{ color: "#cbd5e1", fontSize: 18, fontWeight: 500, textAlign: "center", marginTop: 40 }}>
              No rooms found
            </div>
          )}
          {filteredRooms.map(room => (
            <ExploreRoomCard
              key={room.roomname}
              roomName={room.roomname}
              description={room.desc}
              backgroundImage={room.backgroundImage}
              isPrivate={room.isPrivate}
              link={"/rooms/" + room.roomname.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
