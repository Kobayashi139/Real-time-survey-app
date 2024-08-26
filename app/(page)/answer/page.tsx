'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

type FieldType = '文系' | '理系' | '情報';

const answerPage = () => {
  const [humanities, setHumanities] = useState<number>(0);
  const [science, setScience] = useState<number>(0);
  const [informatics, setInformatics] = useState<number>(0);
  const [liveComment, setLiveComment] = useState<string>(
    'さあ、どのような回答が集まるのか注目です。'
  );
  const [userComment, setUserComment] = useState<string>('');
  const [displayComment, setDisplayComment] = useState<string[]>([]);

  const answer = (field: FieldType) => {
    if (field === '文系') setHumanities((h) => h + 1);
    else if (field === '理系') setScience((s) => s + 1);
    else if (field === '情報') setInformatics((i) => i + 1);

    if (humanities === science && informatics === science) {
      setLiveComment('どの学部も拮抗しています。');
    } else if (humanities > science && humanities > informatics) {
      setLiveComment('文系の学部が多いようです！');
    } else if (science > humanities && science > informatics) {
      setLiveComment('理系の学部が多いようです！');
    } else if (informatics > humanities && informatics > science) {
      setLiveComment('情報系の学部が多いようです！');
    } else if (informatics === humanities) {
      setLiveComment('情報学部と文系学部が接戦です！');
    } else if (informatics === science) {
      setLiveComment('情報学部と理系学部が接戦です！');
    } else if (humanities === science) {
      setLiveComment('文系学部と理系学部が接戦です！');
    }
  };

  const postComment = () => {
    if (userComment.trim() !== '') {
      const date = new Date();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setDisplayComment([
        `${minutes}:${seconds} ${userComment}`,
        ...displayComment,
      ]);
      setUserComment('');
    }
  };

  const resetAnswer = () => {
    setHumanities(0);
    setScience(0);
    setInformatics(0);
    setDisplayComment([]);
    setLiveComment('さあ、どのような回答が集まるのか注目です。');
  };

  const chartData = {
    labels: ['文系', '理系', '情報系'],
    datasets: [
      {
        data: [humanities, science, informatics],
        backgroundColor: ['#FF5733', '#aefa34', '#FFC300'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        border: {
          color: '#eeeeee',
        },
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMax: 5,
        border: {
          dash: [4],
          color: '#eeeeee',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-10 m-0 bg-slate-100">
      <div className="mb-5 p-5 border-4 border-sky-500 rounded-lg">
        <p className="text-gray-950 text-lg mb-4">何系の学部出身ですか？</p>
        <div className="flex space-x-4">
          <button
            onClick={() => answer('文系')}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            文系
          </button>
          <button
            onClick={() => answer('理系')}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            理系
          </button>
          <button
            onClick={() => answer('情報')}
            className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
          >
            情報
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="コメントする"
          className="border border-gray-400 p-2 rounded w-48"
        />
        <button
          onClick={postComment}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-2"
        >
          投稿する
        </button>
      </div>

      <p className="text-xl font-semibold mb-2">■回答状況</p>
      <div className="mb-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <p>
        文系：{humanities} 理系：{science} 情報：{informatics}
      </p>

      <div className="bg-gray-600 text-white p-4 rounded-lg text-center mb-4">
        <p className="text-lg font-bold">{liveComment}</p>
      </div>

      <div className="border border-gray-400 h-32 overflow-y-auto mb-4 p-2">
        {displayComment.map((comment, index) => (
          <p key={index} className="ml-4 mt-2">
            {comment}
          </p>
        ))}
      </div>

      <button
        onClick={resetAnswer}
        className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        回答リセット
      </button>
    </div>
  );
};

export default answerPage;
