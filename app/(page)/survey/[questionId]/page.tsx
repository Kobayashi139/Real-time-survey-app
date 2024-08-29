//rafce で雛形作成
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // "next/router"ではなく"next/navigation"を使用
import Header from '../../../components/layouts/header/Header';
import { useRouter } from 'next/navigation'; //"next/router"は旧バージョン

type Params = {
  questionId: string; //questionIdオブジェクトの型定義
};

const QuestionView: React.FC = () => {
  const { questionId } = useParams<Params>(); //question/questionId URLのquesionid:1111...部分を取得
  const [question, setQuestion] = useState<string | null>(null); //useState<string型 または null型>(初期値)
  const [options, setOptions] = useState<string[]>(['']); //選択肢
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 選択されたインデックスを保存
  const router = useRouter(); //app内の任意の関数routerオブジェクトにアクセス

  useEffect(() => {
    if (!questionId) {
      //idが存在しない場合=nillなどは処理を終了する
      return;
    }

    const queData = localStorage.getItem(questionId); //questionIdをキーとして、オブジェクト内の要素をすべて取得
    console.log(queData); //id,質問,選択肢すべて
    if (queData) {
      try {
        const questionData = JSON.parse(queData) as {
          id: string;
          question: string;
          options: string[];
        };
        setQuestion(questionData.question);
        setOptions(questionData.options); // 同じオブジェクトからoptionsを取得
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, [questionId]);

  if (!questionId || !question) {
    return <div>質問が見つかりません</div>;
  }

  const submitVote = () => {
    if (selectedIndex === null) return; // インデックスが選択されていない場合は何もしない

    const votesKey = `votes_${questionId}`;
    let votes = JSON.parse(localStorage.getItem(votesKey) || '[]');

    if (!votes[selectedIndex]) {
      votes[selectedIndex] = 0;
    }
    votes[selectedIndex] += 1;

    localStorage.setItem(votesKey, JSON.stringify(votes));

    // 結果ページへ遷移
    router.push(`/answer/${questionId}`);
  };

  return (
    <div className="p-10 m-0">
      <Header />
      <h1>質問ID: {questionId}</h1>
      <p>質問内容: {question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <button
            onClick={() => setSelectedIndex(index)} // ボタンをクリックしたときに選択インデックスを更新
            style={{
              backgroundColor: selectedIndex === index ? 'lightblue' : 'white', // 選択中のボタンをハイライト
            }}
          >
            {option}
          </button>
        </div>
      ))}
      <button
        type="submit"
        onClick={submitVote}
        disabled={selectedIndex === null}
      >
        結果を見る
      </button>
    </div>
  );
};
export default QuestionView;
