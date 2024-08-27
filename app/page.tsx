'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Survey App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create">Create a Question</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
