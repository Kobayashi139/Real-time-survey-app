import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <img src="/sample/nanosuke.png" alt="Logo" className="h-10 w-10 mb-4" />
      </div>
    </header>
  );
};

export default Header;
