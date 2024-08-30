'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layouts/header/Header';
import SubmitButton from '../../../components/layouts/SubmitButton';
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
        backgroundColor: [
          '#ff6929',
          '#ffdd00',
          '#20c563',
          '#00ace0',
          '#b094ca',
        ],
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

  const removeStrage = () => {
    const router = useRouter();
    localStorage.removeItem(questionId);
    localStorage.removeItem(`votes_${questionId}`);
    router.push('/container');
  };

  return (
    <div className="p-10 m-0 text-gry">
      <Header />
      <div className="mt-2 w-full items-center">
        <h1 className="inline-block mt-2 w-3/4 p-3 text-gry text-2xl mb-2">
          {question}
        </h1>

        <div className="p-2 mb-2" style={{ width: '100%', height: '20rem' }}>
          <Bar
            data={chartData}
            options={{ ...chartOptions, maintainAspectRatio: false }}
          />
        </div>

        {options.map((option, index) => (
          <div key={index}>
            <p className="text-lg font-medium text-gry">
              {option}: {votes[index] || 0} 票
            </p>
          </div>
        ))}

        <div className="mt-6 mb-4 border-2 border-nano rounded-md">
          <p className="p-2">コメント</p>
          <div
            className="border-y-2 border-nano h-36 overflow-y-auto p-2"
            ref={commentEndRef}
          >
            {displayComment.map((comment, index) => (
              <p key={index} className="ml-4 mt-2 truncate">
                {comment}
              </p>
            ))}
          </div>

          <div className="pt-4 pb-4 flex">
            <input
              type="text"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="コメントする"
              className="border-2 border-nano p-2 w-4/5 ml-4 mr-2 rounded-full w-48"
            />
            <button
              onClick={postComment}
              className="w-10 h-10 bg-nano hover:bg-ble rounded-full text-white text-2xl  "
            >
              <img
                src="/sample/send.svg"
                alt="送信"
                className="size-8 m-auto"
              />
            </button>
          </div>
        </div>
        <form className="mt-28" onSubmit={removeStrage}>
          <SubmitButton title="アンケートを終了する" />
        </form>
      </div>
    </div>
  );
};

export default AnswerView;
