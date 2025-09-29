import React from 'react';
import { motion } from 'framer-motion';
import './Visualizacion.css'; // Crearemos este archivo para los estilos

// Importar las imágenes que guardaste
import heatmapCorrelacion from './assets/heatmap_correlacion.png';
import lineaPrecioAno from './assets/linea_precio_ano.png';
import boxplotCalidadPrecio from './assets/boxplot_calidad_precio.png';
import barrasMetricasError from './assets/barras_metricas_error.png';
import barrasRankingRmse from './assets/barras_ranking_rmse.png';
import matrizConfusion from './assets/matriz_confusion.png';
import barrasMetricasClase from './assets/barras_metricas_clase.png';

export default function Visualizacion() {
  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div 
      className="visualizacion-container"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      
      {/* --- Factores Clave --- */}
      <motion.section className="grafico-seccion" variants={slideVariants}>
        <h2>Factores Clave</h2>
        <img src={heatmapCorrelacion} alt="Mapa de calor de correlación" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Muestra las 10 variables más relacionadas con el precio de venta. </li>
          <li>Valores cercanos a 1 (colores intensos) indican una relación fuerte. </li>
          <li>La calidad general (OverallQual) y el área habitable (GrLivArea) son los factores más influyentes. </li>
        </ul>
      </motion.section>

      {/* --- Tendencias del Mercado --- */}
      <motion.section className="grafico-seccion" variants={slideVariants}>
        <h2>Tendencias del Mercado</h2>
        <img src={lineaPrecioAno} alt="Precio medio por año de construcción" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Revela la evolución del precio promedio según el año de construcción de la propiedad. </li>
          <li>Se observa una tendencia general al alza en las construcciones más recientes. </li>
        </ul>
        
        <h3>Distribución de Precios por Calidad General</h3>
        <img src={boxplotCalidadPrecio} alt="Distribución de precios por calidad" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Muestra cómo se distribuyen los precios según la calidad (escala 1-10). </li>
          <li>Confirma que a mayor calidad, mayor es el precio de venta. </li>
          <li>Las cajas más altas indican mayor variabilidad de precios en esa categoría. </li>
        </ul>
      </motion.section>

      {/* --- Comparación de Modelos --- */}
      <motion.section className="grafico-seccion" variants={slideVariants}>
        <h2>Comparación de Modelos</h2>
        <img src={barrasMetricasError} alt="Comparación de métricas de error" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Compara el desempeño de los modelos usando RMSE (penaliza errores grandes) y MAE (error promedio). </li>
          <li>Valores más bajos indican un mejor desempeño. </li>
        </ul>

        <h3>Ranking de Modelos por RMSE</h3>
        <img src={barrasRankingRmse} alt="Ranking de modelos por RMSE" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Clasifica los modelos según su error cuadrático medio (RMSE). </li>
          <li>El modelo base resultó ser el más preciso según esta métrica ($29,345). </li>
        </ul>
        <h3>Tabla Comparativa de Rendimiento</h3>
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Modelo Base</th>
                <th>Modelo Optimizado</th>
                <th>Simplificado (10f)</th>
                <th>Enriquecido (11f)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Error Absoluto Medio (MAE)</td>
                <td>$17,790.83</td>
                <td>$18,114.99</td>
                <td>$19,192.40</td>
                <td>$19,170.78</td>
              </tr>
              <tr>
                <td>Raíz del Error Cuadrático Medio (RMSE)</td>
                <td>$29,345.06</td>
                <td>$32,566.60</td>
                <td>$30,328.31</td>
                <td>$30,399.65</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="grafico-descripcion">
          <li>Compara el desempeño de los modelos usando RMSE (penaliza errores grandes) y MAE (error promedio).</li>
          <li>El modelo base presenta el mejor equilibrio y el menor RMSE general.</li>
        </ul>
      </motion.section>

      {/* --- Clasificación por Rangos --- */}
      <motion.section className="grafico-seccion" variants={slideVariants}>
        <h2>Clasificación por Rangos de Precio</h2>
        <img src={matrizConfusion} alt="Matriz de Confusión" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Evalúa la capacidad del modelo para clasificar propiedades en rangos (Bajo, Medio, Alto). </li>
          <li>La diagonal principal muestra los aciertos.  El modelo es efectivo en los rangos bajo y medio. </li>
        </ul>

        <h3>Desempeño por Clase</h3>
        <img src={barrasMetricasClase} alt="Desempeño por clase" className="grafico-imagen" />
        <ul className="grafico-descripcion">
          <li>Muestra las métricas de precisión, recall y f1-score para cada rango. </li>
          <li>El modelo es más efectivo clasificando propiedades de precio bajo y medio. </li>
        </ul>
        <h3>Informe de Clasificación</h3>
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Bajo</td><td>0.90</td><td>0.93</td><td>0.91</td><td>138</td></tr>
              <tr><td>Medio</td><td>0.77</td><td>0.86</td><td>0.81</td><td>105</td></tr>
              <tr><td>Alto</td><td>1.00</td><td>0.65</td><td>0.79</td><td>48</td></tr>
              <tr><td colSpan="5" className="table-separator"></td></tr>
              <tr><td><strong>Accuracy</strong></td><td colSpan="4"><strong>0.86</strong></td></tr>
              <tr><td><strong>Macro Avg</strong></td><td>0.89</td><td>0.81</td><td>0.84</td><td>291</td></tr>
              <tr><td><strong>Weighted Avg</strong></td><td>0.86</td><td>0.86</td><td>0.86</td><td>291</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="grafico-descripcion">
          <li>Muestra el rendimiento detallado del modelo para cada categoría.</li>
          <li>La alta precisión en la clase 'Alto' (1.00) significa que cuando el modelo predice "Alto", casi nunca se equivoca.</li>
        </ul>
      </motion.section>

    </motion.div>
  );
}