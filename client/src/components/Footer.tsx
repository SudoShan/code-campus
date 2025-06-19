import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black/30 text-white/80 text-xs text-center py-2 z-50">
      <p>
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Code Campus</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
