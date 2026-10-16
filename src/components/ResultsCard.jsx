import { CheckCircle2, AlertTriangle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function ResultsCard({ result, errors, values, darkMode }) {
  if (!result) return null;

  // Formatear valores a números limpios para la expresión KaTeX
  const x1 = values.x1;
  const y1 = values.y1;
  const x2 = values.x2;
  const y2 = values.y2;
  const x = values.x;

  const yVal = result.y.toFixed(6);
  const slopeVal = result.slope.toFixed(6);

  // Expresión LaTeX para la sustitución paso a paso
  const latexFormula = `y = y_1 + \\frac{y_2 - y_1}{x_2 - x_1}(x - x_1)`;
  const latexSubstitution = `y = ${y1} + \\frac{${y2} - ${y1}}{${x2} - ${x1}} \\cdot (${x} - ${x1})`;
  const latexSlopeStep = `m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = ${slopeVal}`;
  const latexFinalStep = `y = ${y1} + (${slopeVal}) \\cdot (${(Number(x) - Number(x1)).toFixed(4)}) = ${yVal}`;

  return (
    <div className={`p-6 rounded-xl shadow-md border transition-colors space-y-4 ${
      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800'
    }`}>
      <h2 className="text-lg font-bold flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-green-500" /> Resultado de Interpolación
      </h2>

      {/* Valor Destacado */}
      <div className={`p-4 rounded-lg border text-center ${
        darkMode ? 'bg-blue-950/40 border-blue-800' : 'bg-blue-50 border-blue-100'
      }`}>
        <div className="text-sm text-blue-400 font-medium">Valor Interpolado y(x)</div>
        <div className="text-3xl font-extrabold text-blue-500 mt-1">
          {yVal}
        </div>
      </div>

      {/* Desglose Paso a Paso con KaTeX */}
      <div className={`text-xs space-y-3 p-4 rounded-lg border ${
        darkMode ? 'bg-gray-900/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}>
        <div className="font-bold text-sm text-blue-500 mb-2">Procedimiento Paso a Paso:</div>

        {/* Paso 1 */}
        <div className="space-y-1">
          <span className="font-semibold text-gray-400">1. Fórmula general:</span>
          <div className="p-2 bg-gray-950/20 rounded border border-gray-700/30 overflow-x-auto text-center">
            <BlockMath math={latexFormula} />
          </div>
        </div>

        {/* Paso 2 */}
        <div className="space-y-1">
          <span className="font-semibold text-gray-400">2. Sustitución de variables:</span>
          <div className="p-2 bg-gray-950/20 rounded border border-gray-700/30 overflow-x-auto text-center">
            <BlockMath math={latexSubstitution} />
          </div>
        </div>

        {/* Paso 3 */}
        <div className="space-y-1">
          <span className="font-semibold text-gray-400">3. Cálculo de pendiente (m) y resultado:</span>
          <div className="p-2 bg-gray-950/20 rounded border border-gray-700/30 overflow-x-auto text-center space-y-2">
            <BlockMath math={latexSlopeStep} />
            <BlockMath math={latexFinalStep} />
          </div>
        </div>
      </div>

      {/* Errores de Interpolación */}
      {errors && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Margen y Error[cite: 3, 4]
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-gray-400">Valor Exacto f(x)[cite: 3, 4]</div>
              <div className="font-bold">{errors.exactY.toFixed(6)}</div>
            </div>
            <div className={`p-2 rounded border ${darkMode ? 'bg-amber-950/40 border-amber-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <div>Error Absoluto[cite: 3, 4]</div>
              <div className="font-bold">{errors.absoluteError.toFixed(6)}</div>
            </div>
            <div className={`p-2 rounded border ${darkMode ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-900'}`}>
              <div>Error Relativo[cite: 3, 4]</div>
              <div className="font-bold">{errors.relativeError.toFixed(4)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}