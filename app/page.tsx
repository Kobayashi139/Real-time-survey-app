'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>リアルタイムアンケートサービスへようこそ</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create">質問を作成する</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
