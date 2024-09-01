'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; //"next/router"は旧バージョン
import Header from '../../components/layouts/header/Header';
import SubmitButton from '../../components/layouts/SubmitButton';

const CreateQuestion: React.FC = () => {
  const [question, setQuestion] = useState<string>(''); //質問
  const [options, setOptions] = useState<string[]>(['']); //選択肢
  const router = useRouter(); //app内の任意の関数routerオブジェクトにアクセス
  const [error, setError] = useState<string>(''); // エラーメッセージ

  // 質問の文字数制限
  const maxLength = 20;

  console.log(question);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e: イベント, React.FormEvent<HTMLFormElement: onSubmitの型定義
    // handle+イベント名
    e.preventDefault(); // submitイベントの本来の動作=ページリロードをさせない。以下を動作させるため。

    if (question.length > maxLength) {
      setError(`質問は${maxLength}文字以内で入力してください。`);
      return;
    }
    for (const option of options) {
      if (option.length > maxLength) {
        setError(`回答選択肢は${maxLength}文字以内で入力してください。`);
        return;
      }
    }
    setError(''); //errorがないとき

    const questionId = new Date().getTime().toString(); // IDを現在の時間を基に作成
    const data = {
      id: questionId,
      question: question,
      options: options, // 配列をそのまま保存
    };
    localStorage.setItem(questionId, JSON.stringify(data)); // questionIdをキーにして、JSON型(Jsのオブジェクト型)でlocalStorageに保存

    console.log(data); //{id: '1725179940498', question: '質問', options: Array(2)}
    router.push(`/question/${questionId}`); //URLの作成, router.push: 指定したリンクにぺージ遷移
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]; //配列の複製
    newOptions[index] = value; //指定されたindexの選択肢を新しい値に更新する
    setOptions(newOptions); //更新された選択肢の配列をuseState保存する
  };

  const addOption = () => {
    setOptions([...options, '']); // 新しい空の選択肢を追加
  };

  return (
    <div className="p-10 m-0 text-gry">
      <Header />
      <div className="mt-6 w-full flex flex-col items-center">
        <h2 className="text-xl font-bold">1. アンケートを作成する</h2>
      </div>

      <form
        onSubmit={handleSubmit} //onClick={関数}  onClick={() => alert('...')}
        className="mt-6 w-full flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="質問を記入する(20文字以内)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} //target: イベントが発生した要素（この場合は input 要素）
          required //この項目の入力を必須にする
          className="mt-2 w-3/4 p-3 text-gry text-2xl border border-gray-300 rounded-md mb-10"
        />

        <label className="w-3/4 mb-4 font-bold">解答選択肢</label>

        {options.map((option, index) => (
          <div key={index} className="w-3/4 mb-4">
            <input
              type="text"
              placeholder="選択肢を記入する(20文字以内)"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              className="w-full p-3 border-2 border-nano rounded-md font-medium"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addOption}
          className="w-12 h-12 flex items-center justify-center bg-nano hover:bg-ble rounded-full text-white text-2xl mt-4 mb-8"
        >
          ＋
        </button>

        {/* エラーメッセージ表示 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <SubmitButton title="確認" />
      </form>
    </div>
  );
};

export default CreateQuestion;
