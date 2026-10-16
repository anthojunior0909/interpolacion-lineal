import { PRESETS } from '../data/presets';
import { Bookmark, Calculator } from 'lucide-react';

export default function InterpolationForm({ values, onChange, onFocusField, activeField, onSelectPreset, selectedPresetId, darkMode }) {
  const fields = [
    { label: 'x₁', name: 'x1' },
    { label: 'y₁', name: 'y1' },
    { label: 'x₂', name: 'x2' },
    { label: 'y₂', name: 'y2' },
  ];

  return (
    <div className={`p-6 rounded-xl shadow-md border transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800'
    }`}>
      {/* Ejemplos predeterminados */}
      <div className="mb-6">
        <label className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Bookmark className="w-4 h-4 text-blue-500" /> Ejemplos
        </label>
        <div className="grid grid-cols-1 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                selectedPresetId === p.id
                  ? darkMode ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                  : darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold">{p.title}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.description}</div>
            </button>
          ))}
        </div>
      </div>

      <hr className={darkMode ? 'border-gray-700 mb-6' : 'border-gray-200 mb-6'} />

      {/* Inputs */}
      <div className="space-y-4">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-500" /> Parámetros
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{f.label}</label>
              <input
                type="text"
                name={f.name}
                value={values[f.name]}
                onChange={onChange}
                onFocus={() => onFocusField(f.name)}
                className={`w-full border rounded-lg p-2 text-sm outline-none transition-all ${
                  activeField === f.name ? 'ring-2 ring-blue-500 border-blue-500' : ''
                } ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-blue-500 mb-1">
            Punto a evaluar (x)
          </label>
          <input
            type="text"
            name="x"
            value={values.x}
            onChange={onChange}
            onFocus={() => onFocusField('x')}
            className={`w-full border-2 rounded-lg p-2 text-sm font-bold outline-none transition-all ${
              activeField === 'x' ? 'ring-2 ring-blue-500' : ''
            } ${darkMode ? 'bg-gray-700 border-blue-500 text-white' : 'bg-white border-blue-400 text-gray-800'}`}
          />
        </div>
      </div>
    </div>
  );
}