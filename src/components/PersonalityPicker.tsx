import { deskripsiKepribadian } from '../data/descriptions';

interface Props {
  selected: string[];
  setSelected: (sel: string[]) => void;
}

function PersonalityPicker({ selected, setSelected }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelected(
      checked
        ? [...selected, value]
        : selected.filter((item) => item !== value),
    );
  };

  return (
    <div>
      <h2 className="font-bold mb-2 text-indigo-700">
        Pilih tipe kepribadian:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(deskripsiKepribadian).map(([key, desc]) => (
          <label
            key={key}
            className={`flex items-start p-3 rounded-lg shadow-sm border-2 cursor-pointer transition bg-white hover:bg-indigo-50
              ${
                selected.includes(key)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200'
              }
            `}
          >
            <input
              type="checkbox"
              value={key}
              checked={selected.includes(key)}
              onChange={handleChange}
              className="mt-1 accent-indigo-600 mr-3"
            />
            <div>
              <span className="font-semibold text-indigo-700">{key}</span>
              <div className="text-gray-700 text-sm">{desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PersonalityPicker;
