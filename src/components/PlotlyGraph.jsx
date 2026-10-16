import Plot from 'react-plotly.js';

export default function PlotlyGraph({ x1, y1, x2, y2, x, y, exactFunction, xLabel = 'x', yLabel = 'y', darkMode }) {
  let exactCurveX = [];
  let exactCurveY = [];

  if (exactFunction && !isNaN(x1) && !isNaN(x2)) {
    const minX = Math.min(x1, x2) - 1;
    const maxX = Math.max(x1, x2) + 1;
    const step = (maxX - minX) / 100;

    for (let i = minX; i <= maxX; i += step) {
      if (i > 0) {
        exactCurveX.push(i);
        exactCurveY.push(exactFunction(i));
      }
    }
  }

  const data = [
    ...(exactFunction ? [{
      x: exactCurveX,
      y: exactCurveY,
      type: 'scatter',
      mode: 'lines',
      name: 'Función Real f(x)',
      line: { color: darkMode ? '#a78bfa' : '#8884d8', width: 2, dash: 'dot' }
    }] : []),
    {
      x: [x1, x2],
      y: [y1, y2],
      type: 'scatter',
      mode: 'lines',
      name: 'Recta Interpolante r(x)',
      line: { color: darkMode ? '#60a5fa' : '#2563eb', width: 3 }
    },
    {
      x: [x1, x2],
      y: [y1, y2],
      type: 'scatter',
      mode: 'markers',
      name: 'Puntos Conocidos',
      marker: { color: darkMode ? '#93c5fd' : '#1d4ed8', size: 10 }
    },
    {
      x: [x],
      y: [y],
      type: 'scatter',
      mode: 'markers',
      name: 'Punto Interpolado',
      marker: { color: '#ef4444', size: 12, symbol: 'diamond' }
    }
  ];

  const layout = {
    title: { text: 'Gráfico de Interpolación Lineal', font: { color: darkMode ? '#ffffff' : '#111827' } },
    autosize: true,
    paper_bgcolor: darkMode ? '#1f2937' : '#ffffff',
    plot_bgcolor: darkMode ? '#1f2937' : '#ffffff',
    xaxis: { title: xLabel, zeroline: true, titlefont: { color: darkMode ? '#e5e7eb' : '#374151' }, tickfont: { color: darkMode ? '#9ca3af' : '#4b5563' }, gridcolor: darkMode ? '#374151' : '#e5e7eb' },
    yaxis: { title: yLabel, zeroline: true, titlefont: { color: darkMode ? '#e5e7eb' : '#374151' }, tickfont: { color: darkMode ? '#9ca3af' : '#4b5563' }, gridcolor: darkMode ? '#374151' : '#e5e7eb' },
    legend: { orientation: 'h', y: -0.2, font: { color: darkMode ? '#e5e7eb' : '#374151' } },
    margin: { l: 50, r: 30, t: 50, b: 50 }
  };

  return (
    <div className={`p-4 rounded-xl shadow-md border transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        className="w-full h-[400px]"
      />
    </div>
  );
}