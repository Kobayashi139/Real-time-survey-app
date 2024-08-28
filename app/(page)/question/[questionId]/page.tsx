//rafce で雛形作成
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // "next/router"ではなく"next/navigation"を使用

type Params = {
  questionId: string; //questionIdオブジェクトの型定義
};

const QuestionView: React.FC = () => {
  const { questionId } = useParams<Params>(); //question/questionId URLのquesionid:1111...部分を取得
  const [question, setQuestion] = useState<string | null>(null); //useState<string型 または null型>(初期値)

  useEffect(() => {
    if (!questionId) {
      //idが存在しない場合=nillなどは処理を終了する
      return;
    }

    const storedData = localStorage.getItem(questionId); //id取得

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as {
          id: string;
          question: string;
        };
        setQuestion(parsedData.question);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, [questionId]);

  if (!questionId || !question) {
    return <div>質問が見つかりません</div>;
  }

  return (
    <div>
      <h1>質問ID: {questionId}</h1>
      <p>質問内容: {question}</p>
    </div>
  );
};

export default QuestionView;
