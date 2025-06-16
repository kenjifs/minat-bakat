import React, { useState } from 'react';
import { soal } from '../data/questions';

interface Question {
  bidang: string;
  pertanyaan: string;
}

interface Props {
  onFinish: (scores: Record<string, number>) => void;
}

function QuestionForm({ onFinish }: Props) {
  // Generate questions and shuffle
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

  if (answers[current] === -1) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <span className="font-bold">Pertanyaan {current + 1}:</span>
          <br />
          {shuffled[current].pertanyaan}
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          onClick={() => handleAnswer(1)}
        >
          Ya
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleAnswer(0)}
        >
          Tidak
        </button>
      </div>
    );
  }
  return null;
}

export default QuestionForm;
