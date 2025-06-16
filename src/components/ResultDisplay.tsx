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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Hasil Akhir</h2>
      <div className="mb-2">Nama: {nama}</div>
      <div className="mb-2">Kelas: {kelas}</div>
      <div className="mb-2">
        <b>Kepribadian yang dipilih:</b> {pilihan.join(', ')}
      </div>
      <ul className="mt-2 mb-4">
        {pilihan.map((p) => (
          <li key={p} className="mb-1">
            <b>{p}:</b> {deskripsiKepribadian[p]}
          </li>
        ))}
      </ul>
      <h3 className="font-bold mt-4">Hasil Pengujian:</h3>
      <ul>
        {Object.entries(skor).map(([bid, val]) => (
          <li key={bid}>
            {bid}: {val}%
          </li>
        ))}
      </ul>
      <h3 className="font-bold mt-4">Rekomendasi Profesi:</h3>
      {rekomendasi.length > 0 ? (
        <ul>
          {rekomendasi.map(({ bidang, profesi }) => (
            <li key={bidang}>
              <span className="font-semibold">{bidang}:</span>{' '}
              {profesi.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          Tidak ada bidang yang menonjol. Cobalah eksplorasi lebih lanjut.
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
