import { useState } from 'react';
import { PRESETS } from './data/presets';
import { calculateLinearInterpolation, calculateErrors, parseMathExpression } from './utils/mathUtils';
import InterpolationForm from './components/InterpolationForm';
import MathKeypad from './components/MathKeypad';
import PlotlyGraph from './components/PlotlyGraph';
import ResultsCard from './components/ResultsCard';
import { Moon, Sun } from 'lucide-react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeField, setActiveField] = useState('x');
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [values, setValues] = useState({
    x1: PRESETS[0].x1.toString(),
    y1: PRESETS[0].y1.toString(),
    x2: PRESETS[0].x2.toString(),
    y2: PRESETS[0].y2.toString(),
    x: PRESETS[0].x.toString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsertSymbol = (symbol) => {
    if (!activeField) return;
    setValues((prev) => ({
      ...prev,
      [activeField]: prev[activeField] + symbol,
    }));
  };

  const handleClearField = () => {
    if (!activeField) return;
    setValues((prev) => ({ ...prev, [activeField]: '' }));
  };

  const handleDeleteChar = () => {
    if (!activeField) return;
    setValues((prev) => ({
      ...prev,
      [activeField]: prev[activeField].slice(0, -1),
    }));
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setValues({
      x1: preset.x1.toString(),
      y1: preset.y1.toString(),
      x2: preset.x2.toString(),
      y2: preset.y2.toString(),
      x: preset.x.toString(),
    });
  };

  let result = null;
  let errors = null;
  let calculationError = null;

  const numX1 = parseMathExpression(values.x1);
  const numY1 = parseMathExpression(values.y1);
  const numX2 = parseMathExpression(values.x2);
  const numY2 = parseMathExpression(values.y2);
  const numX = parseMathExpression(values.x);

  try {
    if (!isNaN(numX1) && !isNaN(numY1) && !isNaN(numX2) && !isNaN(numY2) && !isNaN(numX)) {
      result = calculateLinearInterpolation(numX1, numY1, numX2, numY2, numX);

      if (selectedPreset && selectedPreset.exactFunction) {
        errors = calculateErrors(result.y, selectedPreset.exactFunction, numX);
      }
    }
  } catch (err) {
    calculationError = err.message;
  }

  return (
    <div className={`min-h-screen transition-colors p-4 md:p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b pb-4 border-gray-700">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold">Calculadora de Interpolación Lineal</h1>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 flex-wrap">
              <span>Visualización interactiva con Plotly.js basada en la fórmula:</span>
              <span className="text-blue-400 font-semibold bg-gray-800/40 px-2 py-0.5 rounded border border-gray-700/50">
                <InlineMath math="y = y_1 + \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)" />
              </span>
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border transition-all ${
              darkMode ? 'bg-gray-800 border-gray-700 text-amber-400' : 'bg-white border-gray-200 text-gray-600'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {calculationError && (
          <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded text-sm text-center">
            {calculationError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Izquierdo: Formularios */}
          <div className="lg:col-span-1 space-y-6">
            <InterpolationForm
              values={values}
              onChange={handleInputChange}
              onFocusField={setActiveField}
              activeField={activeField}
              onSelectPreset={handleSelectPreset}
              selectedPresetId={selectedPreset?.id}
              darkMode={darkMode}
            />
          </div>

          {/* Panel Derecho: Gráfico Superior, Teclado y Resultados Inferiores */}
          <div className="lg:col-span-2 space-y-6">
            <PlotlyGraph
              x1={numX1}
              y1={numY1}
              x2={numX2}
              y2={numY2}
              x={numX}
              y={result ? result.y : 0}
              exactFunction={selectedPreset?.exactFunction}
              xLabel={selectedPreset?.xLabel}
              yLabel={selectedPreset?.yLabel}
              darkMode={darkMode}
            />

            <MathKeypad
              activeField={activeField}
              onInsertSymbol={handleInsertSymbol}
              onClear={handleClearField}
              onDelete={handleDeleteChar}
              darkMode={darkMode}
            />

            <ResultsCard result={result} errors={errors} values={values} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}