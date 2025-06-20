import React, { useState, useEffect, useRef } from "react";

type YourRoomCardProps = {
  roomName: string;
  backgroundImage: string;
  link?: string;
};

function getAverageColor(img: HTMLImageElement): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "rgba(60,120,255,0.35)";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);
  return `rgba(${r},${g},${b},0.35)`;
}

const YourRoomCard: React.FC<YourRoomCardProps> = ({
  roomName,
  backgroundImage,
  link = "/"
}) => {
  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);
  const [shadowColor, setShadowColor] = useState("rgba(60, 120, 255, 0.35)");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundImage;
    img.onload = () => {
      try {
        setShadowColor(getAverageColor(img));
      } catch {
        setShadowColor("rgba(60, 120, 255, 0.35)");
      }
    };
  }, [backgroundImage]);

  return (
    <a
      href={link}
      style={{
        display: "flex",
        alignItems: "center",
        height: 50,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textDecoration: "none",
        transition: "box-shadow 0.18s, transform 0.12s",
        boxShadow: isHovered
          ? `0 10px 18px 0 ${shadowColor}`
          : "0 1px 4px 0 rgba(0,0,0,0.10)",
        transform: isActive ? "scale(0.97)" : "scale(1)",
        cursor: "pointer",
        position: "relative",
        paddingLeft: 18,
        paddingRight: 18,
        userSelect: "none"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {/* Hidden image for color extraction */}
      <img
        ref={imgRef}
        src={backgroundImage}
        alt=""
        style={{ display: "none" }}
        crossOrigin="anonymous"
      />
      {/* Overlay for better text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
          pointerEvents: "none"
        }}
      />
      <span
        style={{
          position: "relative",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          flex: 1,
          zIndex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {roomName}
      </span>
      <span
        style={{
          position: "relative",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginLeft: 16,
          zIndex: 1,
          transition: "color 0.15s",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* Right arrow SVG */}
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  );
};

export default YourRoomCard;
