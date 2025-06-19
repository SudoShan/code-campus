import type React from 'react';
import bgImage from '../assets/bg.png';
import PopularCard from '../components/PopularCard';

export default function RoomsPage() {
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
        className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg text-white text-sm space-y-4"
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
        <PopularCard backgroundImage={bgImage} PopularCard="React" userCount={1000} rating={4.5} />
      </div>
    </div>
  );
}
