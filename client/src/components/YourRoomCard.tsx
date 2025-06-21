import React from "react";
import ShadowCardBase, { RightArrow } from "./ShadowCardBase";

type YourRoomCardProps = {
  roomName: string;
  backgroundImage: string;
  link?: string;
};

const YourRoomCard: React.FC<YourRoomCardProps> = ({
  roomName,
  backgroundImage,
  link = "/"
}) => {
  return (
    <ShadowCardBase backgroundImage={backgroundImage} height={50} as="a" href={link}>
      <span
        style={{
          position: "relative",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          flex: 1,
          zIndex: 1,
          marginLeft: 12,
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
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <RightArrow color="#fff" size={22} />
      </span>
    </ShadowCardBase>
  );
};

export default YourRoomCard;
