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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 my-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 tracking-tight drop-shadow-lg">
          Sistem Pakar Minat & Bakat Siswa
        </h1>
        {step === 'kepribadian' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <label className="block flex-1">
                <span className="text-sm font-medium text-indigo-600">
                  Nama
                </span>
                <input
                  className="border border-indigo-200 rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama kamu"
                />
              </label>
              <label className="block flex-1 mt-3 sm:mt-0">
                <span className="text-sm font-medium text-indigo-600">
                  Kelas
                </span>
                <input
                  className="border border-indigo-200 rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Masukkan kelas kamu"
                />
              </label>
            </div>
            <PersonalityPicker selected={pilihan} setSelected={setPilihan} />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg shadow font-semibold disabled:bg-indigo-300 disabled:cursor-not-allowed"
                disabled={!nama || !kelas || pilihan.length === 0}
                onClick={() => setStep('soal')}
              >
                Lanjutkan
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 transition text-gray-500 px-4 py-2 rounded-lg shadow"
                onClick={() => setShowResetConfirm(true)}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {step === 'soal' && (
          <QuestionForm
            onFinish={(scores) => {
              setSkor(scores);
              setStep('hasil');
            }}
            showReset={() => setShowResetConfirm(true)}
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
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="bg-red-500 hover:bg-red-700 transition text-white px-6 py-2 rounded-lg shadow font-semibold"
              >
                Ulangi Test
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal konfirmasi reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-80 animate-pop">
            <div className="text-xl text-center text-red-600 mb-4 font-bold">
              Konfirmasi Reset
            </div>
            <div className="text-center mb-6">
              Yakin ingin mengulang tes dari awal?
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow font-semibold transition"
              >
                Ya
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-lg shadow transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animasi pop modal */}
      <style>
        {`
          .animate-pop {
            animation: popIn 0.2s cubic-bezier(.4,2,.6,1) both;
          }
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
