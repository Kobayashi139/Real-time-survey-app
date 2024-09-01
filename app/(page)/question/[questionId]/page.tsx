//rafce で雛形作成
'use client';

import React, { useEffect, useState } from 'react';
// useEffect: HTTPリクエストでサーバーからの情報取得などの"副作用"を実現させる
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
  const router = useRouter(); //app内の任意の関数routerオブジェクトにアクセス

  useEffect(() => {
    if (!questionId) {
      //idが存在しない場合=nillなどは処理を終了する
      return;
    }
    console.log(questionId); //URLの末尾id
    const queData = localStorage.getItem(questionId); //questionIdをキーとして、オブジェクト内の要素をすべて取得
    console.log(queData); //id,質問,選択肢すべて
    if (queData) {
      try {
        const questionData = JSON.parse(queData) as {
          //JSON.parse: 文字列をJSONとして解析し、文字列によって記述されているJSの値やオブジェクトを構築
          id: string;
          question: string;
          options: string[];
        };
        setQuestion(questionData.question); //questionを取得しuseState保存
        setOptions(questionData.options); // 同様にoptionsを取得
        console.log(questionData.question); //質問内容
        console.log(questionData.options); //選択肢すべて
      } catch (error) {
        //例外が発生したとき、引数＝例外オブジェクト
        console.error('Error parsing stored data:', error); //データが解析（取得）できません
      }
    }
  }, [questionId]); //引数に与えられたstateの変更に伴うレンダリング後に実行する
  // 第2引数を空にすると、過大処理が起きる

  if (!questionId || !question) {
    return <div>質問が見つかりません</div>;
  }

  const nextPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //デフォルトの送信動作を防ぐ
    router.push(`/survey/${questionId}`); //URLの作成
  };

  return (
    <div className="p-10 m-0 text-gry">
      <Header />
      <div className="mt-6 w-full flex flex-col items-center">
        <h2 className="text-xl font-bold">2. プレビューを確認する</h2>
      </div>

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
              <p className="w-full p-3  border border-nano rounded-md font-medium">
                {option}
              </p>
            </div>
          )
        )}
        <form onSubmit={nextPage}>
          <SubmitButton title="アンケートを開始する" />
        </form>
      </div>
    </div>
  );
};
//localStorage.removeItem('key') でストレージ内を消す
export default QuestionView;
