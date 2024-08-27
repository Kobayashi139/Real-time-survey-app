//rafce で雛形になる
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // "next/router"ではなく"next/navigation"を使用

const QuestionDetail: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      const savedQuestion = localStorage.getItem(id);
      setQuestion(savedQuestion);
    }
  }, [id]); // idが変更されたときにのみ実行

  if (!id || !question) {
    return <div>質問が見つかりません</div>;
  }

  return (
    <div>
      <h1>質問ID: {id}</h1>
      <p>質問内容: {question}</p>
    </div>
  );
};

export default QuestionDetail;
