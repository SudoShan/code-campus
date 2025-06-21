import type React from 'react';
import bgImage from '../assets/bg.png';
import PopularCard from '../components/PopularCard';
import YourRoomCard from '../components/YourRoomCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import c1 from '../assets/Cards/1.jpg';
import c2 from '../assets/Cards/2.jpg';
import c3 from '../assets/Cards/3.jpg';
import c6 from '../assets/Cards/6.jpg';
import c4 from '../assets/Cards/4.jpg';
import c5 from '../assets/Cards/5.jpg';
import c7 from '../assets/Cards/7.jpg';
import c8 from '../assets/Cards/8.jpg';
import c9 from '../assets/Cards/9.jpg';

// Room data with static backgroundImage for each
export const rooms = [
  {
    roomname: "Python Beginners",
    userCount: 1200,
    rating: 4.7,
    desc: "Learn Python from scratch and solve beginner problems.",
    backgroundImage: c6,
    isPrivate: false,
    technologies: ["Python"],
    ownerUsername: "alice"
  },
  {
    roomname: "Flask Web Dev",
    userCount: 950,
    rating: 4.5,
    desc: "Build web apps using Flask and Python.",
    backgroundImage: c2,
    isPrivate: false,
    technologies: ["Python", "Flask"],
    ownerUsername: "bob"
  },
  {
    roomname: "React Learners",
    userCount: 800,
    rating: 4.3,
    desc: "Master React.js and frontend development.",
    backgroundImage: c3,
    isPrivate: true,
    technologies: ["JavaScript", "React"],
    ownerUsername: "carol",
    code: "A1B2C3"
  },
  {
    roomname: "Competitive Coding",
    userCount: 2100,
    rating: 4.9,
    desc: "Sharpen your coding skills for contests.",
    backgroundImage: c1,
    isPrivate: false,
    technologies: ["C++", "Python", "Algorithms"],
    ownerUsername: "dave"
  },
  {
    roomname: "Data Science Hub",
    userCount: 670,
    rating: 4.2,
    desc: "Discuss data science, ML, and AI projects.",
    backgroundImage: c3,
    isPrivate: true,
    technologies: ["Python", "Pandas", "NumPy", "scikit-learn"],
    ownerUsername: "eve",
    code: "X9Y8Z7"
  },
  {
    roomname: "Java Masters",
    userCount: 540,
    rating: 4.1,
    desc: "Deep dive into Java and OOP concepts.",
    backgroundImage: c2,
    isPrivate: false,
    technologies: ["Java"],
    ownerUsername: "frank"
  },
  {
    roomname: "Fullstack Projects",
    userCount: 1300,
    rating: 4.6,
    desc: "Collaborate on fullstack web projects.",
    backgroundImage: c3,
    isPrivate: false,
    technologies: ["Node.js", "React", "MongoDB", "Express"],
    ownerUsername: "grace"
  },
  {
    roomname: "Django Developers",
    userCount: 900,
    rating: 4.4,
    desc: "Build robust apps with Django.",
    backgroundImage: c2,
    isPrivate: true,
    technologies: ["Python", "Django"],
    ownerUsername: "hank",
    code: "Q2W3E4"
  },
  {
    roomname: "Android Studio",
    userCount: 400,
    rating: 4.0,
    desc: "Android app development and Kotlin.",
    backgroundImage: c3,
    isPrivate: false,
    technologies: ["Kotlin", "Android Studio"],
    ownerUsername: "irene"
  },
  {
    roomname: "LeetCode Warriors",
    userCount: 1100,
    rating: 4.5,
    desc: "Daily LeetCode problem solving.",
    backgroundImage: c1,
    isPrivate: false,
    technologies: ["Python", "Java", "C++"],
    ownerUsername: "james"
  },
  {
    roomname: "Open Source Guild",
    userCount: 750,
    rating: 4.3,
    desc: "Contribute to open source projects.",
    backgroundImage: c3,
    isPrivate: false,
    technologies: ["Git", "GitHub", "Any"],
    ownerUsername: "karen"
  },
  {
    roomname: "TypeScript Tribe",
    userCount: 1600,
    rating: 4.8,
    desc: "TypeScript and modern JS best practices.",
    backgroundImage: c2,
    isPrivate: true,
    technologies: ["TypeScript", "JavaScript"],
    ownerUsername: "leo",
    code: "M4N5O6"
  }
];

// Example owner rooms (replace with backend data later)
const ownerRooms = [
  {
    roomName: "My Algorithms Class",
    backgroundImage: c7,
    link: "/rooms/algorithms"
  },
  {
    roomName: "Project X Team",
    backgroundImage: c2,
    link: "/rooms/project-x"
  },
  {
    roomName: "Study Buddies",
    backgroundImage: c4,
    link: "/rooms/study-buddies"
  }
];

// Example participant rooms (replace with backend data later)
const participantRooms = [
  {
    roomName: "Open Source Collab",
    backgroundImage: c5,
    link: "/rooms/opensource"
  },
  {
    roomName: "Math Night",
    backgroundImage: c9,
    link: "/rooms/math-night"
  },
  {
    roomName: "Book Club",
    backgroundImage: c8,
    link: "/rooms/book-club"
  },
  {
    roomName: "Fitness Friends",
    backgroundImage: c4,
    link: "/rooms/fitness-friends"
  },
  {
    roomName: "Music Makers",
    backgroundImage: c7,
    link: "/rooms/music-makers"
  }
];

export default function RoomsPage() {
  // Pick 4 most popular rooms (by userCount)
  const popularRooms = [...rooms]
    .sort((a, b) => b.userCount - a.userCount)
    .slice(0, 4);

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center justify-center"
    >
      <div
        className="backdrop-blur-md bg-black/30 border border-white/30 shadow-lg text-white text-sm space-y-4"
        style={{
          width: "100vw",
          minHeight: "100vh",
          padding: 0,
          margin: 0,
          borderRadius: 0,
          maxWidth: "none",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
          {/* Popular Rooms */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
              marginTop: 40,
            }}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: 24,
              color: "#fff",
              margin: 0
            }}>
              Popular Rooms
            </h2>
            <button
              style={{
                background: "#e0e7ff", // light blue
                color: "#2563eb",      // blue-600
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                borderRadius: 9999,
                padding: "8px 28px",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
              }}
              onClick={() => navigate("/explore")}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe"; // blue-100
                (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";     // blue-700
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#e0e7ff";
                (e.currentTarget as HTMLButtonElement).style.color = "#2563eb";
              }}
              onMouseDown={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#93c5fd"; // blue-300
                (e.currentTarget as HTMLButtonElement).style.color = "#1e40af";     // blue-800
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe";
                (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";
              }}
            >
              Explore
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
              alignItems: "stretch",
              gridAutoRows: "1fr"
            }}
          >
            {/* Render 4 popular cards */}
            {popularRooms.map(room => (
              <PopularCard
                key={room.roomname}
                backgroundImage={room.backgroundImage}
                PopularCard={room.roomname}
                userCount={room.userCount}
                rating={room.rating}
                description={room.desc}
              />
            ))}
          </div>

          {/* Owner Rooms */}
          <div style={{ marginTop: 48 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16
            }}>
              <h3 style={{
                fontWeight: 700,
                fontSize: 24,
                color: "#fff",
                margin: 0
              }}>
                Rooms You Own
              </h3>
              <button
                style={{
                  background: "#e0e7ff", // light blue
                  color: "#2563eb",      // blue-600
                  fontWeight: 600,
                  fontSize: 16,
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 28px",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe"; // blue-100
                  (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";     // blue-700
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#e0e7ff";
                  (e.currentTarget as HTMLButtonElement).style.color = "#2563eb";
                }}
                onMouseDown={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#93c5fd"; // blue-300
                  (e.currentTarget as HTMLButtonElement).style.color = "#1e40af";     // blue-800
                }}
                onMouseUp={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";
                }}
              >
                Create
              </button>
            </div>
            {ownerRooms.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ownerRooms.map(room => (
                  <YourRoomCard
                    key={room.roomName}
                    roomName={room.roomName}
                    backgroundImage={room.backgroundImage}
                    link={room.link}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                color: "#cbd5e1",
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0 24px 0"
              }}>
                You don't own any rooms yet. Create one to get started!
              </div>
            )}
          </div>

          {/* Participant Rooms */}
          <div style={{ marginTop: 40 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16
            }}>
              <h3 style={{
                fontWeight: 700,
                fontSize: 24,
                color: "#fff",
                margin: 0
              }}>
                Rooms You're In
              </h3>
              <button
                style={{
                  background: "#e0e7ff", // light blue
                  color: "#2563eb",      // blue-600
                  fontWeight: 600,
                  fontSize: 16,
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 28px",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe"; // blue-100
                  (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";     // blue-700
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#e0e7ff";
                  (e.currentTarget as HTMLButtonElement).style.color = "#2563eb";
                }}
                onMouseDown={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#93c5fd"; // blue-300
                  (e.currentTarget as HTMLButtonElement).style.color = "#1e40af";     // blue-800
                }}
                onMouseUp={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#dbeafe";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1d4ed8";
                }}
              >
                Join
              </button>
            </div>
            {participantRooms.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 12,
                  // Responsive: 1 column on small screens
                  ...(window.innerWidth <= 600
                    ? { gridTemplateColumns: "1fr" }
                    : {})
                }}
              >
                {participantRooms.map(room => (
                  <YourRoomCard
                    key={room.roomName}
                    roomName={room.roomName}
                    backgroundImage={room.backgroundImage}
                    link={room.link}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                color: "#cbd5e1",
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0 24px 0"
              }}>
                You are not part of any rooms yet. Join one to start collaborating!
              </div>
            )}
          </div>
        </div>
        <div></div>
        <Footer />
      </div>
    </div>
  );
}
