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
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  function handleReset() {
    setStep('kepribadian');
    setNama('');
    setKelas('');
    setPilihan([]);
    setSkor({});
    setShowResetConfirm(false);
  }

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
        <div>
          <ResultDisplay
            nama={nama}
            kelas={kelas}
            pilihan={pilihan}
            skor={skor}
          />
          <button
            onClick={() => setShowResetConfirm(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset Test
          </button>
        </div>
      )}

      {/* Modal konfirmasi */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4 text-lg">
              Yakin ingin mengulang tes dari awal?
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Ya
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
