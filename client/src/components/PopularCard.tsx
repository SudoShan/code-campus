import React from "react";

type PopularCardProps = {
  backgroundImage: string;
  PopularCard: string;
  userCount: number;
  rating: number; // e.g., 4.5
};

function formatUserCount(count: number) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M users`;
  if (count >= 10_000) return `${Math.floor(count / 1_000)}K users`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K users`;
  return `${count} users`;
}

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} style={{color: "#FFD700"}}>★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            color: "#FFD700",
            width: "1em"
          }}
        >
          {/* Full gray star as base */}
          <span style={{ color: "#ccc" }}>★</span>

          {/* Half-gold overlay */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              overflow: "hidden",
              color: "#FFD700"
            }}
          >
            ★
          </span>
        </span>

      );
    } else {
      stars.push(<span key={i} style={{color: "#FFD700"}}>☆</span>);
    }
  }
  return stars;
}

const PopularCard: React.FC<PopularCardProps> = ({ backgroundImage, PopularCard, userCount, rating }) => (
  <div
    style={{
      position: "relative",
      width: 240,
      height: 140,
      borderRadius: 16,
      overflow: "hidden",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}
  >
    {/* Top-left name */}
    <div style={{
      position: "absolute",
      top: 16,
      left: 16,
      fontWeight: "bold",
      fontSize: 20,
      textShadow: "0 1px 4px rgba(0,0,0,0.5)"
    }}>
      {PopularCard}
    </div>
    {/* Bottom info */}
    <div style={{
      position: "absolute",
      left: 16,
      bottom: 16,
      right: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    }}>
      {/* Star rating and value */}
      <div style={{display: "flex", alignItems: "center", marginBottom: 2}}>
        <span>{renderStars(rating)}</span>
        <span style={{marginLeft: 8, fontWeight: "bold", fontSize: 12}}>{rating}</span>
      </div>
      {/* User count */}
      <div style={{fontSize: 15, fontWeight: 500, textShadow: "0 1px 4px rgba(0,0,0,0.5)"}}>
        {formatUserCount(userCount)}
      </div>
    </div>
  </div>
);

export default PopularCard;