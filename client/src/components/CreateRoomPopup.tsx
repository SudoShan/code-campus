import React, { useState, useRef } from "react";

const TECHNOLOGIES = ["Python", "Java", "C++", "HTML&CSS"];

type Room = {
  roomName: string;
  selectedTech: string[];
  visibility: "public" | "private";
  discoverable?: boolean;
  managers: string[];
};

type CreateRoomPopupProps = {
  onClose: () => void;
  onCreate?: (room: Room) => void;
  checkUsernameExists?: (username: string) => boolean | Promise<boolean>;
};

const CreateRoomPopup: React.FC<CreateRoomPopupProps> = ({
  onClose,
  onCreate,
  checkUsernameExists
}) => {
  const [roomName, setRoomName] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [discoverable, setDiscoverable] = useState(false);
  const [managerInput, setManagerInput] = useState("");
  const [managers, setManagers] = useState<string[]>([]);
  const [managerError, setManagerError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate username check if not provided
  const checkUser = async (username: string) => {
    if (checkUsernameExists) {
      const res = await checkUsernameExists(username);
      return res;
    }
    // Simulate: allow any non-empty, non-duplicate username
    return !!username && !managers.includes(username);
  };

  const handleTechToggle = (tech: string) => {
    setSelectedTech(selected =>
      selected.includes(tech)
        ? selected.filter(t => t !== tech)
        : [...selected, tech]
    );
  };

  const handleManagerAdd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && managerInput.trim()) {
      const username = managerInput.trim();
      const exists = await checkUser(username);
      if (!exists) {
        setManagerError("Username does not exist or already added.");
        return;
      }
      setManagers([...managers, username]);
      setManagerInput("");
      setManagerError("");
    }
  };

  const handleManagerRemove = (username: string) => {
    setManagers(managers.filter(m => m !== username));
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate({
        roomName,
        selectedTech,
        visibility,
        discoverable: visibility === "private" ? discoverable : undefined,
        managers
      });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        transform: "translate(0%, -20%)",
        inset: 0,
        top: 50,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#18181b",
          borderRadius: 18,
          minWidth: 370,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          padding: "0 0 24px 0",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxHeight: undefined,
          overflowY: undefined
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px 12px 28px",
        }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: "white" }}>Create a Room</span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: 22,
              cursor: "pointer",
              padding: 0,
              marginLeft: 16
            }}
            aria-label="Close"
          >
            &#10005;
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "6px 28px 0 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Room Name */}
          <div>
            <label style={{ color: "white", fontWeight: 500, fontSize: 15 }}>Room Name</label>
            <input
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "#23232b",
                color: "white",   
                fontSize: 15,
                outline: "none"
              }}
              placeholder="Enter room name"
              autoFocus
            />
          </div>

          {/* Technologies */}
          <div>
            <label style={{ color: "white", fontWeight: 500, fontSize: 15 }}>Technologies</label>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              {TECHNOLOGIES.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 7,
                    border: selectedTech.includes(tech) ? "2px solid #eab308" : "1px solid #facc15",
                    background: selectedTech.includes(tech) ? "#facc15" : "#23232b",
                    color: selectedTech.includes(tech) ? "#18181b" : "#fde047",
                    fontWeight: selectedTech.includes(tech) ? 700 : 500,
                    fontSize: 12,
                    minWidth: 70,
                    height: 28,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxSizing: "border-box"
                  }}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility Slider */}
          <div>
            <label style={{ color: "white", fontWeight: 500, fontSize: 15 }}>Visibility</label>
            <div style={{
              display: "flex",
              gap: 0,
              marginTop: 8,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #facc15",
              width: 210
            }}>
              <button
                type="button"
                onClick={() => setVisibility("public")}
                style={{
                  flex: 1,
                  background: visibility === "public" ? "#fde047" : "transparent",
                  color: visibility === "public" ? "#18181b" : "#facc15",
                  border: "none",
                  padding: "8px 0",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.15s"
                }}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setVisibility("private")}
                style={{
                  flex: 1,
                  background: visibility === "private" ? "#fde047" : "transparent",
                  color: visibility === "private" ? "#18181b" : "#facc15",
                  border: "none",
                  padding: "8px 0",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.15s"
                }}
              >
                Private
              </button>
            </div>
          </div>

          {/* Discoverable (only if private) */}
          {visibility === "private" && (
            <div style={{ marginTop: -6 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={discoverable}
                  onChange={e => setDiscoverable(e.target.checked)}
                  style={{
                    accentColor: "#facc15",
                    width: 14,
                    height: 14,
                    marginRight: 4
                  }}
                />
                <span style={{ color: "white", fontSize: 13, fontWeight: 500 }}>Allow this room to be discoverable?</span>
              </label>
            </div>
          )}

          {/* Add Managers */}
          <div>
            <label style={{ color: "white", fontWeight: 500, fontSize: 15 }}>Add Managers</label>
            <input
              ref={inputRef}
              value={managerInput}
              onChange={e => {
                setManagerInput(e.target.value);
                setManagerError("");
              }}
              onKeyDown={handleManagerAdd}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "#23232b",
                color: "white",
                fontSize: 15,
                outline: "none"
              }}
              placeholder="Enter username and press Enter"
            />
            {managerError && (
              <div style={{ color: "#facc15", fontSize: 13, marginTop: 2 }}>{managerError}</div>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {managers.map(username => (
                <span
                  key={username}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#fde047",
                    color: "#18181b",
                    borderRadius: 9999,
                    padding: "4px 12px 4px 10px",
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  {username}
                  <span
                    style={{
                      marginLeft: 8,
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "black"
                    }}
                    onClick={() => handleManagerRemove(username)}
                    aria-label="Remove"
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            style={{
              marginTop: 10,
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "10px 0",
              cursor: "pointer",
              transition: "background 0.15s",
              width: "100%"
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPopup;
