'use client';

import React from 'react';
import StartButton from '../../components/layouts/StartButton';

const page = () => {
  return (
    <div className="p-10 m-0">
      <img
        src="/sample/nanosuke.png"
        alt="Logo"
        className="h-20 w-20 mt-16 mb-16 m-auto"
      />
      <h1 className="block text-center text-gry text-xl font-semibold mb-16">
        Thank you for playing！
      </h1>
      <div className="text-center mb-10">
        <StartButton title="もう一度始める" url="/create" />
      </div>
    </div>
  );
};

export default page;
