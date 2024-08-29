'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/layouts/header/Header';
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

type Params = {
  questionId: string;
};

const AnswerView: React.FC = () => {
  const { questionId } = useParams<Params>();
  const [question, setQuestion] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(['']);
  const [votes, setVotes] = useState<number[]>([]);
  const [userComment, setUserComment] = useState<string>(''); //ユーザーのコメント
  const [displayComment, setDisplayComment] = useState<string[]>([]); //実況
  const commentEndRef = useRef<HTMLDivElement>(null); //スクロール位置を制御するためのref

  useEffect(() => {
    if (!questionId) {
      return;
    }

    const queData = localStorage.getItem(questionId);
    const votesData = localStorage.getItem(`votes_${questionId}`);
    if (queData) {
      try {
        const questionData = JSON.parse(queData) as {
          id: string;
          question: string;
          options: string[];
        };
        setQuestion(questionData.question);
        setOptions(questionData.options);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }

    if (votesData) {
      try {
        setVotes(JSON.parse(votesData));
      } catch (error) {
        console.error('Error parsing votes data:', error);
      }
    }
  }, [questionId]);

  useEffect(() => {
    // 新しいコメントが追加されるたびに、スクロールを最下部に移動
    if (commentEndRef.current) {
      commentEndRef.current.scrollTop = commentEndRef.current.scrollHeight;
    }
  }, [displayComment]);

  if (!questionId || !question) {
    return <div>質問が見つかりません</div>;
  }

  const chartData = {
    labels: options,
    datasets: [
      {
        data: votes,
        backgroundColor: ['#FF5733', '#aefa34', '#FFC300', '#3498db'],
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

  const postComment = () => {
    if (userComment.trim() !== '') {
      const date = new Date();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setDisplayComment([
        ...displayComment,
        `${minutes}:${seconds} ${userComment}`,
      ]);
      setUserComment('');
    }
  };

  return (
    <div className="p-10 m-0">
      <Header />
      <h1>質問ID: {questionId}</h1>
      <p>質問内容: {question}</p>
      <div className="mb-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <p>
            {option}: {votes[index] || 0} 票
          </p>
        </div>
      ))}

      <div
        className="border border-gray-400 h-32 overflow-y-auto mb-4 p-2"
        ref={commentEndRef}
      >
        {displayComment.map((comment, index) => (
          <p key={index} className="ml-4 mt-2">
            {comment}
          </p>
        ))}
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
    </div>
  );
};

export default AnswerView;
