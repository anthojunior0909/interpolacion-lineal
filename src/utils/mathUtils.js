/**
 * Calcula la interpolación lineal basada en la fórmula de la diapositiva:
 * y = y1 + ((y2 - y1) / (x2 - x1)) * (x - x1)
 */
export function calculateLinearInterpolation(x1, y1, x2, y2, x) {
  if (x1 === x2) {
    throw new Error("x1 y x2 no pueden ser iguales (división por cero).");
  }

  const slope = (y2 - y1) / (x2 - x1);
  const y = y1 + slope * (x - x1);

  return { y, slope };
}

/**
 * Parsea expresiones matemáticas extendidas
 */
export function parseMathExpression(expr) {
  if (typeof expr === 'number') return expr;
  if (!expr || expr.toString().trim() === '') return NaN;

  try {
    let str = expr.toString().trim();

    // Constantes
    str = str.replace(/\bPI\b/g, 'Math.PI');
    str = str.replace(/\bE\b/g, 'Math.E');

    // Raíz y Logaritmos
    str = str.replace(/\bsqrt\(/g, 'Math.sqrt(');
    str = str.replace(/\bln\(/g, 'Math.log(');
    str = str.replace(/\blog10\(/g, 'Math.log10(');

    // Trigonométricas Inversas
    str = str.replace(/\basen\(/g, 'Math.asin(');
    str = str.replace(/\bacos\(/g, 'Math.acos(');
    str = str.replace(/\batg\(/g, 'Math.atan(');
    str = str.replace(/\basec\(/g, 'Math.acos(1/');
    str = str.replace(/\bacsc\(/g, 'Math.asin(1/');
    str = str.replace(/\bactg\(/g, 'Math.atan(1/');

    // Trigonométricas Directas
    str = str.replace(/\bsen\(/g, 'Math.sin(');
    str = str.replace(/\bcos\(/g, 'Math.cos(');
    str = str.replace(/\btg\(/g, 'Math.tan(');
    str = str.replace(/\bsec\(/g, '(1/Math.cos(');
    str = str.replace(/\bcsc\(/g, '(1/Math.sin(');
    str = str.replace(/\bctg\(/g, '(1/Math.tan(');

    // Potencias
    str = str.replace(/\^/g, '**');

    return Function(`"use strict"; return (${str})`)();
  } catch {
    return NaN;
  }
}

/**
 * Cálculo del error absoluto y relativo
 */
export function calculateErrors(interpolatedY, exactFunction, x) {
  if (!exactFunction) return null;

  const exactY = exactFunction(x);
  const absoluteError = Math.abs(exactY - interpolatedY);
  const relativeError = (absoluteError / Math.abs(exactY)) * 100;

  return { exactY, absoluteError, relativeError };
}