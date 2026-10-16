# 📈 Calculadora de Interpolación Lineal e Interactiva

Aplicación web interactiva desarrollada con **React**, **JavaScript**, **Tailwind CSS**, **Plotly.js** y **KaTeX**. Permite calcular e interpolar valores intermedios a partir de dos puntos conocidos usando la formula de interpolación lineal, visualizar gráficos dinámicos, utilizar un teclado matemático completo y medir errores analíticos.

---

## 🚀 Características

* **Cálculo Paso a Paso:** Muestra el procedimiento de la fórmula de interpolación lineal en tipografía matemática con **KaTeX**.
* **Gráficos Interactivos:** Renderizado en tiempo real con **Plotly.js** (zoom, inspección de puntos, rectas e iteraciones de funciones continuas).
* **Teclado Matemático Completo:** Inserción de funciones trigonométricas directas e inversas (`sen`, `cos`, `tg`, `sec`, `csc`, `ctg`, `asen`, etc.), raíces, logaritmos, potencias y constantes ($\pi$, $e$).
* **Preajustes de la Diapositiva:** Carga rápida de ejemplos y ejercicios teóricos (Calor específico del aire, $\ln(3)$, elongación de resorte, etc.).
* **Cálculo de Errores:** Margen de error absoluto y relativo si se dispone de una función continua exacta $f(x)$.
* **Modo Oscuro / Claro:** Interfaz adaptable con soporte para Dark Mode.

---

## 🛠️ Tecnologías Utilizadas

* [React 18 / 19](https://react.dev/) - Biblioteca UI de JavaScript.
* [Vite](https://vitejs.dev/) - Empaquetador rápido para proyectos Frontend.
* [Plotly.js](https://plotly.com/javascript/) / `react-plotly.js` - Gráficos científicos interactivos.
* [KaTeX](https://katex.org/) / `react-katex` - Renderizado rápido de matemáticas en HTML/JSX.
* [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS para diseño responsivo.
* [Lucide React](https://lucide.dev/) - Colección de íconos para UI.

---

## 📦 Guía de Instalación y Configuración

Sigue estos pasos para clonar el repositorio e instalar todas las bibliotecas requeridas.

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) en tu sistema.

### 2. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/interpolacion-lineal.git](https://github.com/tu-usuario/interpolacion-lineal.git)
cd interpolacion-lineal