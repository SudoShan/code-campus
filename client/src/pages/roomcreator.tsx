import React, { useState } from "react";

const COLORS = {
  background: "#101628",
  header: "#0c0f1a",
  tabBlue: "#19203a",
  accentYellow: "#dcb440",
  white: "#ffffff",
  tabInactive: "#252c44",
  borderGray: "#3a415a",
  lightgray: "rgb(173, 173, 173)",
  glassBackground: "rgba(255, 255, 255, 0.09)",
  red: "#dc2626",
  green: "#22c55e",
  grayText: "#cbd5e1",
  switchBg: "#374151",
};

type Assignment = {
  id: string;
  name: string;
  dueDate?: string;
  description: string;
  completed?: boolean;
  reportUrl?: string;
};

type Announcement = {
  id: string;
  message: string;
  postedAt: Date;
};

type Participant = {
  id: string;
  name: string;
  email?: string;
};

// Helpers to populate lots of assignments and announcements
function generateAssignments(type: "due" | "open" | "completed", n: number): Assignment[] {
  return Array(n).fill(0).map((_, idx) => ({
    id: `${type}-${idx + 1}`,
    name: `${type === "due" ? "Due" : type === "open" ? "Open" : "Completed"} Assignment ${idx + 1}`,
    dueDate: type === "due" ? new Date(Date.now() + ((idx+1) * 50 + 60) * 60 * 1000).toISOString() : undefined,
    description: "",
    completed: type === "completed",
    reportUrl: type === "completed" ? "#" : undefined,
  }));
}

function generateAnnouncements(n: number): Announcement[] {
  return Array(n).fill(0).map((_, idx) => ({
    id: `ann-${idx + 1}`,
    message: `Announcement message ${idx + 1}: This is a test announcement for scrolling.`,
    postedAt: new Date(Date.now() - (idx * 15 * 60 * 1000)),
  }));
}

const initialDueAssignments: Assignment[] = generateAssignments("due", 15);
const initialOpenAssignments: Assignment[] = generateAssignments("open", 15);
const initialCompletedAssignments: Assignment[] = generateAssignments("completed", 15);

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
  ...generateAnnouncements(18),
];

const mockParticipants: Participant[] = [
  { id: "p1", name: "Alice" },
  { id: "p2", name: "Bob" },
  { id: "p3", name: "Charlie" },
];

const mockRequests: Participant[] = [
  { id: "r1", name: "Dave" },
  { id: "r2", name: "Eve" },
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
  isCompleted?: boolean;
}> = ({
  assignment,
  isCompleted = false,
}) => (
  <div
    style={{
      background: COLORS.tabBlue,
      borderRadius: 12,
      marginBottom: 14,
      padding: "16px 20px",
      position: "relative",
      boxShadow: "0 1px 4px #0002",
      color: COLORS.white,
      cursor: "default",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      minHeight: 56,
    }}
  >
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
    <div style={{ display: "flex", gap: 8 }}>
      {!isCompleted && (
        <>
          <button
            style={{
              background: "#5553",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              color: COLORS.accentYellow,
              fontWeight: 700,
              cursor: "not-allowed",
              opacity: 0.8,
            }}
            title="Edit (feature coming soon)"
            disabled
          >
            Edit
          </button>
          <button
            style={{
              background: COLORS.red,
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              color: COLORS.white,
              fontWeight: 700,
              cursor: "not-allowed",
              opacity: 0.8,
            }}
            title="Delete (feature coming soon)"
            disabled
          >
            Delete
          </button>
        </>
      )}
      {isCompleted && (
        <button
          style={{
            background: COLORS.accentYellow,
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            color: COLORS.tabBlue,
            fontWeight: 700,
            cursor: "pointer",
            minWidth: 145,
            boxShadow: "0 1px 2px #0002",
            transition: "background 0.2s",
          }}
          onClick={() => {
            if (assignment.reportUrl) {
              window.open(assignment.reportUrl, "_blank");
            } else {
              alert("No report available");
            }
          }}
        >
          View / Download Report
        </button>
      )}
    </div>
  </div>
);

const AnnouncementSection: React.FC<{
  announcements: Announcement[];
}> = ({ announcements }) => {
  return (
    <div
      style={{
        background: COLORS.glassBackground,
        border: `1px solid ${COLORS.borderGray}`,
        borderRadius: 16,
        padding: 20,
        backdropFilter: "blur(8px)",
        marginBottom: 0,
        height: "calc(60vh - 72px)",
        overflowY: "auto",
        position: "relative",
        WebkitOverflowScrolling: "touch",
      }}
      className="hide-scrollbar"
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
      {announcements.map(a => (
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

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      userSelect: "none",
    }}
    onClick={onChange}
    title="Toggle public/private"
  >
    <span style={{ color: checked ? COLORS.green : COLORS.red, fontWeight: 600, fontSize: 15, minWidth: 56, display: "inline-block" }}>
      {checked ? "Public" : "Private"}
    </span>
    <div
      style={{
        width: 48,
        height: 26,
        background: checked ? COLORS.green : COLORS.red,
        borderRadius: 16,
        position: "relative",
        transition: "background 0.2s",
        boxShadow: "0 1px 5px #0005",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 24 : 2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: COLORS.white,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px #0003",
        }}
      />
    </div>
  </div>
);

const RoomCreator: React.FC = () => {
  // Assignments state (no add/edit/delete for now)
  const [dueAssignments] = useState<Assignment[]>(initialDueAssignments);
  const [openAssignments] = useState<Assignment[]>(initialOpenAssignments);
  const [completedAssignments] = useState<Assignment[]>(initialCompletedAssignments);

  // UI state
  const [activeTab, setActiveTab] = useState<"due" | "open" | "completed">("due");

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    ...getDueSoonAnnouncements(initialDueAssignments),
    ...staticAnnouncements,
  ]);
  const [announcementInput, setAnnouncementInput] = useState("");

  // Room meta
  const [isPublic, setIsPublic] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);

  // Room info (static for now, could be editable)
  const [roomName, setRoomName] = useState("Advanced React Study Group");
  const [roomCode] = useState("ABC123");
  const [description, setDescription] = useState(
    "A focused learning circle for mastering advanced React concepts, patterns, and performance tuning."
  );

  // Participants/Requests
  const [participants] = useState<Participant[]>(mockParticipants);
  const [requests] = useState<Participant[]>(mockRequests);

  // Handlers
  const handleAddAnnouncement = () => {
    if (!announcementInput.trim()) return;
    setAnnouncements([
      {
        id: `custom-${Date.now()}`,
        message: announcementInput.trim(),
        postedAt: new Date(),
      },
      ...announcements,
    ]);
    setAnnouncementInput("");
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied to clipboard.");
  };

  // Dummy edit room (for demo)
  const handleEditRoomDetails = () => {
    setShowEditRoom(true);
  };

  // Dummy delete room (for demo)
  const handleDeleteRoom = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      alert("Room deleted (demo only).");
    }
  };

  return (
    <div style={{ background: COLORS.background, minHeight: "100vh" }}>
      <style>
        {`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 0;
          height: 0;
          background: transparent;
          display: none;
        }
        `}
      </style>
      <div className="w-full h-[50px] bg-transparent"></div>

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
            flexWrap: "wrap",
            gap: 14,
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
              padding: "7px 18px",
              background: "#23272f",
              color: COLORS.white,
              fontWeight: 500,
              borderRadius: 8,
              border: `1px solid ${COLORS.borderGray}`,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onClick={() => alert("Leaving room (demo only)")}
          >
            Leave Room
          </button>
          <button
            style={{
              padding: "7px 18px",
              background: COLORS.red,
              color: COLORS.white,
              fontWeight: 600,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              boxShadow: "0 2px 8px #0002",
            }}
            onClick={handleDeleteRoom}
          >
            Delete Room
          </button>
          <button
            style={{
              padding: "7px 18px",
              background: "#222b3a",
              color: COLORS.accentYellow,
              fontWeight: 500,
              borderRadius: 8,
              border: `1px solid ${COLORS.borderGray}`,
              cursor: "pointer",
            }}
            onClick={() => setShowParticipants(true)}
          >
            View Participants
          </button>
          <button
            style={{
              padding: "7px 18px",
              background: "#222b3a",
              color: COLORS.accentYellow,
              fontWeight: 500,
              borderRadius: 8,
              border: `1px solid ${COLORS.borderGray}`,
              cursor: "pointer",
            }}
            onClick={() => setShowRequests(true)}
          >
            View Requests
          </button>
          <ToggleSwitch checked={isPublic} onChange={() => setIsPublic(v => !v)} />
          <button
            style={{
              padding: "7px 18px",
              background: "#23272f",
              color: COLORS.accentYellow,
              fontWeight: 500,
              borderRadius: 8,
              border: `1px solid ${COLORS.borderGray}`,
              cursor: "pointer",
            }}
            onClick={handleEditRoomDetails}
          >
            Edit Room Details
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", padding: 24, gap: 24 }}>
        {/* Left - Assignments */}
        <div style={{ flex: 1.3, maxWidth: "65%" }}>
          {/* Tabs and Add */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
            <button
              onClick={() => setActiveTab("due")}
              style={{
                flex: 1,
                background: activeTab === "due" ? COLORS.tabBlue : COLORS.tabInactive,
                color: activeTab === "due" ? COLORS.accentYellow : COLORS.grayText,
                border: "none",
                borderRadius: 8,
                padding: "11px 0",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.2,
                boxShadow: activeTab === "due" ? "0 2px 8px #0002" : undefined,
                transition: "background 0.2s, color 0.2s",
                cursor: "pointer",
              }}
            >
              Due Soon
            </button>
            <button
              onClick={() => setActiveTab("open")}
              style={{
                flex: 1,
                background: activeTab === "open" ? COLORS.tabBlue : COLORS.tabInactive,
                color: activeTab === "open" ? COLORS.accentYellow : COLORS.grayText,
                border: "none",
                borderRadius: 8,
                padding: "11px 0",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.2,
                boxShadow: activeTab === "open" ? "0 2px 8px #0002" : undefined,
                transition: "background 0.2s, color 0.2s",
                cursor: "pointer",
              }}
            >
              Open Always
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              style={{
                flex: 1,
                background: activeTab === "completed" ? COLORS.tabBlue : COLORS.tabInactive,
                color: activeTab === "completed" ? COLORS.accentYellow : COLORS.grayText,
                border: "none",
                borderRadius: 8,
                padding: "11px 0",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.2,
                boxShadow: activeTab === "completed" ? "0 2px 8px #0002" : undefined,
                transition: "background 0.2s, color 0.2s",
                cursor: "pointer",
              }}
            >
              Already Completed
            </button>
            <button
              style={{
                background: COLORS.accentYellow,
                color: COLORS.tabBlue,
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                marginLeft: 12,
                cursor: "not-allowed",
                opacity: 0.8,
              }}
              disabled
              title="Feature coming soon"
            >
              + Add Assignment
            </button>
          </div>
          {/* Assignment lists (scrollable, no visible bar) */}
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              paddingRight: 4,
            }}
            className="hide-scrollbar"
          >
            {activeTab === "due" &&
              dueAssignments.map(a => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                />
              ))}
            {activeTab === "open" &&
              openAssignments.map(a => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                />
              ))}
            {activeTab === "completed" &&
              completedAssignments.map(a => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  isCompleted
                />
              ))}
          </div>
        </div>

        {/* Right - Announcements and input */}
        <div style={{ flex: 0.7, maxWidth: "35%", display: "flex", flexDirection: "column" }}>
          {/* Announcements scrollable */}
          <AnnouncementSection announcements={announcements} />
          {/* Chatbox for new announcement (fixed under announcements) */}
          <div
            style={{
              background: COLORS.glassBackground,
              border: `1px solid ${COLORS.borderGray}`,
              borderRadius: 14,
              padding: 16,
              marginTop: 10,
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              backdropFilter: "blur(8px)",
              position: "relative",
            }}
          >
            <textarea
              value={announcementInput}
              onChange={e => setAnnouncementInput(e.target.value)}
              placeholder="Type new announcement..."
              style={{
                flex: 1,
                minHeight: 48,
                resize: "vertical",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.borderGray}`,
                borderRadius: 8,
                color: COLORS.white,
                padding: 8,
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              style={{
                background: COLORS.accentYellow,
                color: COLORS.tabBlue,
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                cursor: "pointer",
                alignSelf: "flex-end",
                fontSize: 15,
                boxShadow: "0 1px 3px #0002",
              }}
              onClick={handleAddAnnouncement}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* PARTICIPANTS DIALOG */}
      {showParticipants && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
          onClick={() => setShowParticipants(false)}
        >
          <div
            style={{
              background: COLORS.tabBlue,
              borderRadius: 10,
              padding: 32,
              minWidth: 350,
              color: COLORS.white,
              boxShadow: "0 4px 32px #000a",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Room Participants</h2>
            {participants.map(p => (
              <div
                key={p.id}
                style={{
                  padding: "6px 0",
                  borderBottom: `1px solid ${COLORS.borderGray}`,
                  fontSize: 16,
                }}
              >
                {p.name} {p.email && <span>({p.email})</span>}
              </div>
            ))}
            <button
              style={{
                marginTop: 18,
                padding: "8px 24px",
                background: COLORS.accentYellow,
                color: COLORS.tabBlue,
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => setShowParticipants(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REQUESTS DIALOG */}
      {showRequests && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
          onClick={() => setShowRequests(false)}
        >
          <div
            style={{
              background: COLORS.tabBlue,
              borderRadius: 10,
              padding: 32,
              minWidth: 350,
              color: COLORS.white,
              boxShadow: "0 4px 32px #000a",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Join Requests</h2>
            {requests.length === 0 && <div>No requests.</div>}
            {requests.map(r => (
              <div
                key={r.id}
                style={{
                  padding: "6px 0",
                  borderBottom: `1px solid ${COLORS.borderGray}`,
                  fontSize: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{r.name}</span>
                <span>
                  <button
                    style={{
                      marginRight: 8,
                      padding: "3px 10px",
                      background: COLORS.green,
                      color: COLORS.white,
                      border: "none",
                      borderRadius: 6,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Accepted (demo only)")}
                  >
                    Accept
                  </button>
                  <button
                    style={{
                      padding: "3px 10px",
                      background: COLORS.red,
                      color: COLORS.white,
                      border: "none",
                      borderRadius: 6,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Rejected (demo only)")}
                  >
                    Reject
                  </button>
                </span>
              </div>
            ))}
            <button
              style={{
                marginTop: 18,
                padding: "8px 24px",
                background: COLORS.accentYellow,
                color: COLORS.tabBlue,
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => setShowRequests(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT ROOM DETAILS DIALOG */}
      {showEditRoom && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
          onClick={() => setShowEditRoom(false)}
        >
          <div
            style={{
              background: COLORS.tabBlue,
              borderRadius: 10,
              padding: 32,
              minWidth: 350,
              color: COLORS.white,
              boxShadow: "0 4px 32px #000a",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Edit Room Details</h2>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: `1px solid ${COLORS.borderGray}`,
                  fontSize: 15,
                  background: COLORS.background,
                  color: COLORS.white,
                }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: `1px solid ${COLORS.borderGray}`,
                  fontSize: 15,
                  background: COLORS.background,
                  color: COLORS.white,
                  minHeight: 60,
                }}
              />
            </div>
            <div>
              <button
                style={{
                  marginTop: 12,
                  marginRight: 16,
                  padding: "8px 24px",
                  background: COLORS.accentYellow,
                  color: COLORS.tabBlue,
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => setShowEditRoom(false)}
              >
                Save
              </button>
              <button
                style={{
                  marginTop: 12,
                  padding: "8px 24px",
                  background: COLORS.red,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => setShowEditRoom(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCreator;