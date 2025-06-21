import React from "react";
import ShadowCardBase, { RightArrow } from "./ShadowCardBase";

const LockIcon = ({ color = "#fff", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="5" y="9" width="10" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M7 9V7a3 3 0 1 1 6 0v2" stroke={color} strokeWidth="2"/>
  </svg>
);
const GlobeIcon = ({ color = "#fff", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2"/>
    {/* Single latitude (horizontal) and longitude (vertical) lines */}
    <ellipse cx="10" cy="10" rx="8" ry="3.5" stroke={color} strokeWidth="1.2"/>
    <ellipse cx="10" cy="10" rx="3.5" ry="8" stroke={color} strokeWidth="1.2"/>
  </svg>
);

type ExploreRoomCardProps = {
  roomName: string;
  description: string;
  backgroundImage: string;
  isPrivate?: boolean;
  link?: string;
};

const ExploreRoomCard: React.FC<ExploreRoomCardProps> = ({
  roomName,
  description,
  backgroundImage,
  isPrivate = false,
  link = "/"
}) => {
  return (
    <ShadowCardBase backgroundImage={backgroundImage} height={60} as="a" href={link}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        zIndex: 1,
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isPrivate ? <LockIcon color="#fff" size={20} /> : <GlobeIcon color="#fff" size={20} />}
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{roomName}</span>
        </div>
        <span style={{ color: '#e5e7eb', fontSize: 13, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</span>
      </div>
      <div style={{ marginLeft: 'auto', marginRight: 18, zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <RightArrow color="#fff" size={22} />
      </div>
    </ShadowCardBase>
  );
};

export default ExploreRoomCard;
