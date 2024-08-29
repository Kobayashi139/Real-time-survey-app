'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; //"next/router"は旧バージョン
import Header from '../../components/layouts/header/Header';

const CreateQuestion: React.FC = () => {
  const [question, setQuestion] = useState<string>(''); //質問
  const [options, setOptions] = useState<string[]>(['']); //選択肢
  const router = useRouter(); //app内の任意の関数routerオブジェクトにアクセス

  //React.FormEvent<HTMLFormElement: onSubmitの型定義
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submitイベントの本来の動作=以下を動作させるため、ページ遷移を止める

    const questionId = new Date().getTime().toString(); // IDを現在の時間を基に作成
    const data = {
      id: questionId,
      question: question,
      options: options, // 配列をそのまま保存
    };
    localStorage.setItem(questionId, JSON.stringify(data)); // questionIdをキーにしてlocalStorageに保存

    console.log(data);
    router.push(`/question/${questionId}`); //URLの作成
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']); // 新しい空の選択肢を追加
  };

  return (
    <div className="p-10 m-0">
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          質問内容:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)} //target=input setQuestion=questionの更新
            required
          />
        </label>
        <hr />

        <label>解答選択肢:</label>
        {options.map(
          (
            option,
            index //{ }で囲うとJSになるmap(option, 何番目か)
          ) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          )
        )}
        <button type="button" onClick={addOption}>
          ＋選択肢を追加
        </button>
        <hr />
        <button type="submit">質問を作成</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
