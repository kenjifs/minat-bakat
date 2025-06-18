import React, { useState } from 'react';
import { soal } from '../data/questions';

interface Question {
  bidang: string;
  pertanyaan: string;
}

interface Props {
  onFinish: (scores: Record<string, number>) => void;
  showReset: () => void;
}

function QuestionForm({ onFinish, showReset }: Props) {
  // Generate & shuffle questions
  const allQuestions: Question[] = [];
  Object.entries(soal).forEach(([bidang, questions]) =>
    questions.forEach((q) => allQuestions.push({ bidang, pertanyaan: q })),
  );
  const shuffled = React.useMemo(
    () => allQuestions.sort(() => Math.random() - 0.5),
    [],
  );

  const [answers, setAnswers] = useState<number[]>(
    Array(shuffled.length).fill(-1),
  );
  const [current, setCurrent] = useState(0);

  const handleAnswer = (ans: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = ans;
    setAnswers(newAnswers);
    if (current < shuffled.length - 1) setCurrent(current + 1);
    else {
      // Hitung skor & kirim ke parent
      const bidangScores: Record<string, number[]> = {};
      shuffled.forEach((q, idx) => {
        if (!bidangScores[q.bidang]) bidangScores[q.bidang] = [];
        bidangScores[q.bidang].push(newAnswers[idx] === 1 ? 1 : 0);
      });
      const scores = Object.fromEntries(
        Object.entries(bidangScores).map(([k, v]) => [
          k,
          v.reduce((a, b) => a + b, 0) * 10,
        ]),
      );
      onFinish(scores);
    }
  };

  const progress = Math.round(((current + 1) / shuffled.length) * 100);

  return (
    <div className="p-3">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-indigo-700 font-medium text-sm">
            Progress Tes
          </span>
          <span className="text-xs text-gray-500">
            {current + 1}/{shuffled.length}
          </span>
        </div>
        <div className="w-full bg-indigo-100 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Pertanyaan */}
      <div className="mb-4 text-lg font-semibold text-indigo-900">
        {shuffled[current].pertanyaan}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-7 py-2 rounded-lg font-semibold shadow transition-all active:scale-95"
          onClick={() => handleAnswer(1)}
        >
          Ya
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-7 py-2 rounded-lg font-semibold shadow transition-all active:scale-95"
          onClick={() => handleAnswer(0)}
        >
          Tidak
        </button>
        <button
          className="ml-auto bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 px-5 py-2 rounded-lg shadow transition"
          onClick={showReset}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;
