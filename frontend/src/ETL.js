import React from 'react';
import { motion } from 'framer-motion';
import './ETL.css'; // Crearemos este archivo para los estilos
import { FaDatabase, FaExchangeAlt, FaCogs, FaCloudDownloadAlt, FaMapMarkedAlt } from 'react-icons/fa';

export default function ETL() {
  const curlNominatim = `curl -G "https://nominatim.openstreetmap.org/search" \\
--data-urlencode "q=CollgCr, Ames, Iowa" \\
--data-urlencode "format=json"`;

  const curlOverpass = `curl -X POST "https://overpass-api.de/api/interpreter" \\
-d '[out:json];(node[amenity=school](around:1600,42.02, -93.64););out count;'`;

  return (
    <motion.div 
      className="etl-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <header className="etl-header">
        <FaDatabase className="header-icon" />
        <h2>Proceso ETL: Enriquecimiento de Datos</h2>
        <p>
          Para mejorar la precisión de nuestros modelos, no nos limitamos al dataset original.
          Implementamos un proceso de <strong>Extract, Transform, Load (ETL)</strong> para
          añadir información valiosa del mundo real.
        </p>
      </header>

      <div className="etl-steps">
        {/* --- EXTRACT --- */}
        <motion.div className="step-card" whileHover={{ scale: 1.03 }}>
          <div className="step-icon-container extract">
            <FaCloudDownloadAlt />
          </div>
          <h3>1. Extract (Extraer)</h3>
          <p>
            Obtenemos datos geográficos de APIs públicas de <strong>OpenStreetMap</strong>.
            Este paso convierte los nombres de los barrios en datos accionables.
          </p>
        </motion.div>

        {/* --- TRANSFORM --- */}
        <motion.div className="step-card" whileHover={{ scale: 1.03 }}>
          <div className="step-icon-container transform">
            <FaCogs />
          </div>
          <h3>2. Transform (Transformar)</h3>
          <p>
            Los datos extraídos se procesan para crear una nueva característica:
            <strong>"Número de Escuelas Cercanas"</strong>. La información cruda se convierte en
            un indicador numérico que el modelo puede entender.
          </p>
        </motion.div>

        {/* --- LOAD --- */}
        <motion.div className="step-card" whileHover={{ scale: 1.03 }}>
          <div className="step-icon-container load">
            <FaExchangeAlt />
          </div>
          <h3>3. Load (Cargar)</h3>
          <p>
            El dataset original se une con la nueva característica y se guarda como
            un nuevo archivo (`train_enriquecido.csv`), listo para ser usado en el
            entrenamiento de un modelo más potente.
          </p>
        </motion.div>
      </div>

      <div className="etl-script-info">
        <h3>El Script `enriquecer_datos.py`</h3>
        <p>
          Este script de Python automatiza todo el proceso. Itera sobre los 25 barrios únicos,
          consulta las APIs para cada uno, y mapea los resultados a las 1460 propiedades,
          optimizando el número de llamadas de ~3000 a solo 50.
        </p>
      </div>

      <div className="etl-curls">
        <h3>Ejemplos Prácticos con `cURL`</h3>
        
        <div className="curl-example">
          <h4><FaMapMarkedAlt /> Geocodificación (Nominatim)</h4>
          <p>Convierte el nombre de un barrio en coordenadas (latitud y longitud).</p>
          <pre><code>{curlNominatim}</code></pre>
        </div>

        <div className="curl-example">
          <h4><FaDatabase /> Búsqueda de Puntos de Interés (Overpass)</h4>
          <p>Usa las coordenadas para contar cuántas escuelas hay en un radio de 1600 metros.</p>
          <pre><code>{curlOverpass}</code></pre>
        </div>
      </div>
    </motion.div>
  );
}