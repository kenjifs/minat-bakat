import { useState } from 'react';
import './App.css';

import PersonalityPicker from './components/PersonalityPicker';
import QuestionForm from './components/QuestionForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [step, setStep] = useState<'kepribadian' | 'soal' | 'hasil'>(
    'kepribadian',
  );
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [pilihan, setPilihan] = useState<string[]>([]);
  const [skor, setSkor] = useState<Record<string, number>>({});

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Sistem Pakar Minat & Bakat Siswa
      </h1>
      {step === 'kepribadian' && (
        <div>
          <label>
            Nama:
            <input
              className="border p-2 ml-2 mb-2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </label>
          <br />
          <label>
            Kelas:
            <input
              className="border p-2 ml-2 mb-2"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            />
          </label>
          <PersonalityPicker selected={pilihan} setSelected={setPilihan} />
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!nama || !kelas || pilihan.length === 0}
            onClick={() => setStep('soal')}
          >
            Lanjutkan
          </button>
        </div>
      )}
      {step === 'soal' && (
        <QuestionForm
          onFinish={(scores) => {
            setSkor(scores);
            setStep('hasil');
          }}
        />
      )}
      {step === 'hasil' && (
        <ResultDisplay
          nama={nama}
          kelas={kelas}
          pilihan={pilihan}
          skor={skor}
        />
      )}
    </div>
  );
}

export default App;
