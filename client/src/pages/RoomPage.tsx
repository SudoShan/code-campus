import React, { useState, useEffect } from "react";

const COLORS = {
  background: "#101628", // darker blue
  header: "#0c0f1a",
  tabBlue: "#19203a",
  accentYellow: "#dcb440", // slightly muted yellow
  white: "#ffffff",
  tabInactive: "#252c44",
  borderGray: "#3a415a",
  lightgray: "rgb(173, 173, 173)",
  glassBackground: "rgba(255, 255, 255, 0.09)", // transparent glass effect
};

type Assignment = {
  id: string;
  name: string;
  dueDate?: string;
  description: string;
};

type Announcement = {
  id: string;
  message: string;
  postedAt: Date;
};

const dueAssignments: Assignment[] = [
  {
    id: "1",
    name: "LeetCode 101",
    dueDate: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    description: "",
  },
  {
    id: "2",
    name: "Project Proposal",
    dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    description: "",
  },
];

const openAssignments: Assignment[] = [
  { id: "3", name: "Weekly Challenge", description: "" },
  { id: "4", name: "Topic Suggestion", description: "" },
];

const staticAnnouncements: Announcement[] = [
  {
    id: "a1",
    message: "Group sync this Saturday at 7pm. Drop your questions in chat.",
    postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "a2",
    message: "Assignment 3 will unlock tonight at 10pm.",
    postedAt: new Date(Date.now() - 60 * 60 * 1000),
  },
];

const getDueSoonAnnouncements = (assignments: Assignment[]): Announcement[] => {
  const now = Date.now();
  return assignments
    .filter(a => {
      if (!a.dueDate) return false;
      const due = new Date(a.dueDate).getTime();
      const diff = due - now;
      return diff <= 2 * 60 * 60 * 1000 && diff > 0;
    })
    .map(a => ({
      id: `due-${a.id}`,
      message: `Reminder: "${a.name}" is due in less than 2 hours.`,
      postedAt: new Date(),
    }));
};

const timeAgo = (date: Date): string => {
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
};

const AssignmentCard: React.FC<{
  assignment: Assignment;
  expanded: boolean;
  toggle: () => void;
}> = ({ assignment, expanded, toggle }) => (
  <div
    style={{
      background: COLORS.tabBlue,
      borderRadius: 12,
      marginBottom: 14,
      padding: "16px 20px",
      position: "relative",
      boxShadow: expanded ? "0 2px 10px #0005" : "0 1px 2px #0003",
      transition: "box-shadow 0.2s",
      cursor: "pointer",
      color: COLORS.white,
    }}
    onClick={toggle}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.accentYellow }}>
          {assignment.name}
        </div>
        {assignment.dueDate && (
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Due: {new Date(assignment.dueDate).toLocaleString()}
          </div>
        )}
      </div>
      <button
        style={{
          background: COLORS.accentYellow,
          border: "none",
          borderRadius: 8,
          padding: "6px 14px",
          color: COLORS.tabBlue,
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={e => {
          e.stopPropagation();
          alert(`Action for "${assignment.name}"`);
        }}
      >
        Go
      </button>
    </div>
  </div>
);

const AnnouncementSection: React.FC<{ extraAnnouncements?: Announcement[] }> = ({
  extraAnnouncements = [],
}) => {
  const all = [
    ...getDueSoonAnnouncements(dueAssignments),
    ...staticAnnouncements,
    ...extraAnnouncements,
  ];

  return (
    <div
      style={{
        background: COLORS.glassBackground,
        minHeight: "65vh",
        border: `1px solid ${COLORS.borderGray}`,
        borderRadius: 16,
        padding: 20,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.accentYellow,
          marginBottom: 12,
        }}
      >
        Announcements
      </div>
      {all.map(a => (
        <div
          key={a.id}
          style={{
            background: COLORS.tabBlue,
            border: `1px solid ${COLORS.borderGray}`,
            borderRadius: 10,
            padding: 14,
            marginBottom: 14,
            color: COLORS.white,
          }}
        >
          <div>{a.message}</div>
          <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>
            Posted {timeAgo(a.postedAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

const RoomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"due" | "open">("due");
  const [expandedDue, setExpandedDue] = useState<string | null>(null);
  const [expandedOpen, setExpandedOpen] = useState<string | null>(null);

  const roomName = "Advanced React Study Group";
  const roomCode = "ABC123";
  const description =
    "A focused learning circle for mastering advanced React concepts, patterns, and performance tuning.";

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied to clipboard.");
  };

  return (
    <div style={{ background: COLORS.background, minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: COLORS.header,
          color: COLORS.white,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 56,
          padding: "0 22px",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "monospace" }}>
          CODE<span style={{ color: COLORS.accentYellow }}>CAMPUS</span>
        </div>
        <nav style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 16 }}>
          <span>≡</span>
          <span>✉️</span>
          <span>👤</span>
        </nav>
      </header>

      {/* Room Info */}
      <div
        style={{
          padding: "20px 24px 10px 24px",
          color: COLORS.white,
          borderBottom: `1px solid ${COLORS.borderGray}`,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700 }}>{roomName}</div>
        <div style={{ marginTop: 4, fontSize: 14 }}>{description}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 14,
              border: `1px solid ${COLORS.borderGray}`,
              cursor: "pointer",
            }}
            onClick={copyRoomCode}
            title="Click to copy"
          >
            Code: {roomCode}
          </div>
          <button
            style={{
              padding: "6px 16px",
              background: "#991b1b",
              color: COLORS.white,
              fontWeight: 600,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", padding: 24, gap: 24 }}>
        {/* Left - Assignments */}
        <div style={{ flex: 1.3, maxWidth: "65%" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => setActiveTab("due")}
              style={{
                flex: 1,
                background: activeTab === "due" ? COLORS.tabBlue : COLORS.tabInactive,
                color: activeTab === "due" ? COLORS.accentYellow : COLORS.lightgray,
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Due Soon
            </button>
            <button
              onClick={() => setActiveTab("open")}
              style={{
                flex: 1,
                background: activeTab === "open" ? COLORS.tabBlue : COLORS.tabInactive,
                color: activeTab === "open" ? COLORS.accentYellow : COLORS.lightgray,
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Open Always
            </button>
          </div>

          {(activeTab === "due" ? dueAssignments : openAssignments).map(a => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              expanded={(activeTab === "due" ? expandedDue : expandedOpen) === a.id}
              toggle={() =>
                activeTab === "due"
                  ? setExpandedDue(expandedDue === a.id ? null : a.id)
                  : setExpandedOpen(expandedOpen === a.id ? null : a.id)
              }
            />
          ))}
        </div>

        {/* Right - Announcements */}
        <div style={{ flex: 0.7, maxWidth: "35%" }}>
          <AnnouncementSection />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
