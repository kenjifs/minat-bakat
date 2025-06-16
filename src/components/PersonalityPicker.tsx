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
      <h2 className="font-bold mb-2">Pilih tipe kepribadian:</h2>
      <div className="grid gap-3">
        {Object.entries(deskripsiKepribadian).map(([key, desc]) => (
          <label key={key} className="block p-2 border rounded cursor-pointer">
            <input
              type="checkbox"
              value={key}
              checked={selected.includes(key)}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="font-semibold">{key}</span>: {desc}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PersonalityPicker;
