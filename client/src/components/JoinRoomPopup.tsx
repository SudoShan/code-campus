import React, { useRef, useState } from "react";
import { rooms } from "../pages/RoomsPage";

interface JoinRoomPopupProps {
  roomName: string;
  onClose: () => void;
}

const isValidChar = (c: string) => /^[A-Z0-9]$/.test(c);

const JoinRoomPopup: React.FC<JoinRoomPopupProps> = ({ roomName, onClose }) => {
  const room = rooms.find(r => r.roomname === roomName);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [bounces, setBounces] = useState([false, false, false, false, false, false]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  if (!room || !room.isPrivate) return null;

  const handleInput = (idx: number, val: string) => {
    if (!val) {
      setCode(prev => {
        const arr = [...prev];
        arr[idx] = "";
        return arr;
      });
      setBounces(b => {
        const arr = [...b];
        arr[idx] = false;
        return arr;
      });
      return;
    }
    const char = val.toUpperCase();
    if (!isValidChar(char)) return;
    setCode(prev => {
      const arr = [...prev];
      arr[idx] = char;
      return arr;
    });
    setBounces(b => {
      const arr = [...b];
      arr[idx] = false;
      setTimeout(() => {
        setBounces(b2 => {
          const arr2 = [...b2];
          arr2[idx] = true;
          return arr2;
        });
      }, 10);
      return arr;
    });
    if (idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (code[idx]) {
        setCode(prev => {
          const arr = [...prev];
          arr[idx] = "";
          return arr;
        });
        setBounces(b => {
          const arr = [...b];
          arr[idx] = false;
          return arr;
        });
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    } else if (e.key === "Enter") {
      handleJoin();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    if (pasted.length) {
      setCode(pasted.split("").concat(Array(6 - pasted.length).fill("")));
      setTimeout(() => {
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
      }, 10);
    }
    e.preventDefault();
  };

  const handleJoin = () => {
    if (code.join("") === room.code) {
      setError("");
      onClose();
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.45)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#232323",
        borderRadius: 18,
        boxShadow: "0 8px 32px #0008",
        width: 350,
        padding: 28,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer"
          }}
          aria-label="Close"
        >
          ×
        </button>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 8 }}>Join Room</div>
        <div style={{ color: '#facc15', fontWeight: 600, fontSize: 17, marginBottom: 2 }}>{room.roomname}</div>
        <div style={{ color: '#e5e7eb', fontSize: 14, marginBottom: 18 }}>Owner: {room.ownerUsername}</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {code.map((c, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={c}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              style={{
                width: 38,
                height: 48,
                fontSize: 28,
                textAlign: 'center',
                borderRadius: 8,
                border: bounces[i] ? '2px solid #facc15' : '1.5px solid #444',
                background: '#18181b',
                color: '#fff',
                outline: 'none',
                boxShadow: bounces[i] ? '0 0 0 4px #fde04755' : 'none',
                transition: 'box-shadow 0.18s, border 0.18s',
                animation: bounces[i] ? 'bounce 0.25s' : 'none',
                fontWeight: 700
              }}
              autoFocus={i === 0}
              inputMode="text"
              pattern="[A-Z0-9]"
            />
          ))}
        </div>
        {error && <div style={{ color: '#f87171', fontWeight: 500, marginBottom: 10 }}>{error}</div>}
        <button
          style={{
            width: '100%',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            marginTop: 8,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #2563eb44',
            transition: 'background 0.15s'
          }}
          onClick={handleJoin}
          onKeyDown={e => { if (e.key === 'Enter') handleJoin(); }}
        >
          Join
        </button>
        <style>{`
          @keyframes bounce {
            0% { transform: scale(1); }
            40% { transform: scale(1.18); }
            60% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
