
import { Delete, RotateCcw } from 'lucide-react';

export default function MathKeypad({ activeField, onInsertSymbol, onClear, onDelete, darkMode }) {
  const buttons = [
    // Fila 1: Trigonométricas Directas
    { label: 'sen', value: 'sen(' },
    { label: 'cos', value: 'cos(' },
    { label: 'tg', value: 'tg(' },
    { label: 'sec', value: 'sec(' },
    { label: 'csc', value: 'csc(' },
    { label: 'ctg', value: 'ctg(' },

    // Fila 2: Trigonométricas Inversas
    { label: 'asen', value: 'asen(' },
    { label: 'acos', value: 'acos(' },
    { label: 'atg', value: 'atg(' },
    { label: 'asec', value: 'asec(' },
    { label: 'acsc', value: 'acsc(' },
    { label: 'actg', value: 'actg(' },

    // Fila 3: Raíces, Potencias, Logaritmos y Constantes
    { label: 'e', value: 'E' },
    { label: 'π', value: 'PI' },
    { label: 'ln', value: 'ln(' },
    { label: 'log₁₀', value: 'log10(' },
    { label: '√x', value: 'sqrt(' },
    { label: 'xⁿ', value: '^' },

    // Fila 4: Símbolos
    { label: '(', value: '(' },
    { label: ')', value: ')' },
  ];

  return (
    <div className={`p-4 rounded-xl border shadow-sm transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-blue-500">
          Teclado Matemático Completo {activeField ? `(Insertando en ${activeField})` : '(Haz clic en un input)'}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => onInsertSymbol(btn.value)}
            disabled={!activeField}
            className={`p-2 text-xs font-semibold rounded-lg border transition-all ${
              activeField
                ? darkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800'
                : 'opacity-40 cursor-not-allowed border-transparent'
            }`}
          >
            {btn.label}
          </button>
        ))}

        {/* Botón Borrar Carácter */}
        <button
          onClick={onDelete}
          disabled={!activeField}
          className="p-2 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500/20 flex justify-center items-center col-span-2"
        >
          <Delete className="w-4 h-4 mr-1" /> Borrar
        </button>

        {/* Botón Limpiar Campo */}
        <button
          onClick={onClear}
          disabled={!activeField}
          className="p-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 flex justify-center items-center col-span-2"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Limpiar
        </button>
      </div>
    </div>
  );
}