import { deskripsiKepribadian } from '../data/descriptions';

interface Props {
  nama: string;
  kelas: string;
  pilihan: string[];
  skor: Record<string, number>;
}

function bidangMenonjol(nilai: Record<string, number>) {
  return Object.entries(nilai)
    .filter(([, skor]) => skor >= 60)
    .sort((a, b) => b[1] - a[1])
    .map(([bidang]) => bidang);
}

function rekomendasiProfesi(bidangUnggul: string[]) {
  const daftar = [];
  if (bidangUnggul.includes('Realistic'))
    daftar.push({ bidang: 'Realistic', profesi: ['Insinyur', 'Arsitek'] });
  if (bidangUnggul.includes('Investigative'))
    daftar.push({
      bidang: 'Investigative',
      profesi: ['Dokter Hewan', 'Psikolog'],
    });
  if (bidangUnggul.includes('Artistic'))
    daftar.push({ bidang: 'Artistic', profesi: ['Aktor', 'Perancang Busana'] });
  if (bidangUnggul.includes('Sosial'))
    daftar.push({ bidang: 'Sosial', profesi: ['Dosen', 'Perawat'] });
  if (bidangUnggul.includes('Enterprising'))
    daftar.push({ bidang: 'Enterprising', profesi: ['Akuntan', 'Pengacara'] });
  if (bidangUnggul.includes('Convensional'))
    daftar.push({
      bidang: 'Convensional',
      profesi: ['Peneliti', 'Aparatur Sipil Negara(ASN)'],
    });
  return daftar;
}

function ResultDisplay({ nama, kelas, pilihan, skor }: Props) {
  const unggul = bidangMenonjol(skor);
  const rekomendasi = rekomendasiProfesi(unggul);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-2 text-indigo-700 text-center">
        Hasil Akhir
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="mb-1 text-gray-500 text-xs">Nama</div>
          <div className="font-semibold text-indigo-800">{nama}</div>
        </div>
        <div>
          <div className="mb-1 text-gray-500 text-xs">Kelas</div>
          <div className="font-semibold text-indigo-800">{kelas}</div>
        </div>
      </div>
      <div className="my-3">
        <div className="font-semibold text-indigo-600">
          Kepribadian yang dipilih:
        </div>
        <ul className="list-inside list-disc text-gray-700 ml-4">
          {pilihan.map((p) => (
            <li key={p}>
              <span className="font-bold text-indigo-700">{p}</span>:{' '}
              <span className="italic">{deskripsiKepribadian[p]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-3">
        <div className="font-semibold text-indigo-600">Hasil Pengujian:</div>
        <ul className="mt-1">
          {Object.entries(skor).map(([bid, val]) => (
            <li
              key={bid}
              className={`py-1 px-2 rounded text-sm ${
                val >= 60
                  ? 'bg-indigo-100 text-indigo-700 font-bold'
                  : 'text-gray-600'
              }`}
            >
              {bid}: {val}%
            </li>
          ))}
        </ul>
      </div>
      <div className="my-3">
        <div className="font-semibold text-indigo-600">
          Rekomendasi Profesi:
        </div>
        {rekomendasi.length > 0 ? (
          <ul className="list-inside list-disc text-indigo-800 ml-5 mt-1">
            {rekomendasi.map(({ bidang, profesi }) => (
              <li key={bidang}>
                <span className="font-bold">{bidang}</span>:{' '}
                {profesi.join(', ')}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600 mt-2 italic">
            Tidak ada bidang yang menonjol. Cobalah eksplorasi lebih lanjut!
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultDisplay;
