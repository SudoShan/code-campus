import React, { useState, useEffect } from "react";

export function getAverageColor(img: HTMLImageElement): string {
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

export const RightArrow = ({ color = "#fff", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M7 5l5 5-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export type ShadowCardBaseProps = {
  backgroundImage: string;
  height?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  as?: React.ElementType;
  href?: string;
};

const ShadowCardBase: React.FC<ShadowCardBaseProps> = ({
  backgroundImage,
  height = 60,
  style = {},
  children,
  onClick,
  as: Tag = 'div',
  href
}) => {
  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);
  const [shadowColor, setShadowColor] = useState("rgba(60, 120, 255, 0.35)");

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
    <Tag
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        height,
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
        cursor: onClick || href ? "pointer" : "default",
        position: "relative",
        userSelect: "none",
        ...style
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={onClick}
    >
      {/* Overlay for better text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
          pointerEvents: "none"
        }}
      />
      {children}
    </Tag>
  );
};

export default ShadowCardBase;
