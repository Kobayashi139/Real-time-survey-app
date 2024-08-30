//rafce で雛形作成
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // "next/router"ではなく"next/navigation"を使用
import Header from '../../../components/layouts/header/Header';
import { useRouter } from 'next/navigation'; //"next/router"は旧バージョン
import SubmitButton from '../../../components/layouts/SubmitButton';

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

  const submitVote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="p-10 m-0 text-gry">
      <Header />
      <div className="mt-6 w-full flex flex-col items-center">
        <div className="mt-6 w-full flex flex-col items-center">
          <p className="inline-block mt-2 w-3/4 p-3 text-gry text-2xl rounded-md mb-10">
            {question}
          </p>
          {options.map(
            (
              option,
              index //{ }で囲うとJSになるmap(option, 何番目か)
            ) => (
              <div key={index} className="w-3/4 mb-8 text-center">
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="w-full p-3 rounded-md border-2 border-nano hover:bg-nano hover:text-neutral-50 focus:outline-none focus:border-ble focus:border-4 focus:bg-nano focus:text-neutral-50"
                >
                  {option}
                </button>
              </div>
            )
          )}
          <form onSubmit={submitVote}>
            <SubmitButton title="投票する" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default QuestionView;
