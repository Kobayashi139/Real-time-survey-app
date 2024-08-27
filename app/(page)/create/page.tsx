'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; //"next/router"は旧バージョン

const CreateQuestion: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const router = useRouter(); //app内の任意の関数routerオブジェクトにアクセス

  //React.FormEvent<HTMLFormElement: onSubmitの型定義
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submitイベントの本来の動作=以下を動作させるため、ページ遷移を止める
    const questionId = new Date().getTime().toString(); // IDを現在の時間を基に生成

    console.log('Saving question with ID:', questionId, 'Question:', question);
    localStorage.setItem(questionId, question); //idと質問をセットする
    router.push(`/question/${questionId}`); //URLの作成
  };

  return (
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
      <button type="submit">質問を作成</button>
    </form>
  );
};

export default CreateQuestion;
