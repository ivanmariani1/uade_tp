// src/Presentacion.js
import React from "react";
import { motion } from "framer-motion";
import "./Presentacion.css";
import { FaSeedling, FaHome, FaProjectDiagram, FaTags,FaCogs } from "react-icons/fa";
import { SiPython, SiFastapi, SiReact, SiNumpy } from "react-icons/si";
import graficoEDA from './assets/grafico.png';

export default function Presentacion() {
  return (
    <div className="presentacion">

      {/* 🔹 Slide 1 - Portada */}
      <motion.section
        className="slide portada"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h1>PREDICCION DE PRECIOS DE VIVIENDAS</h1>
        <p className="autor">Equipo de Desarrollo - 2025

        </p>

        <div className="decor decor-bottom">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
      </motion.section>

      {/* 🔹 Slide 2 - Dominio y Problemática */}
      <motion.section
        className="slide negocio"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="left-box">
          <h2>DOMINIO DEL NEGOCIO</h2>
          <hr />
          <p>
            El negocio inmobiliario requiere estimaciones precisas de precios
            para mejorar la toma de decisiones estratégicas.
          </p>
          <p>
            Se busca entregar valor a <strong>Gerencia Comercial y Técnica</strong>,
            ofreciendo información confiable y basada en datos.
          </p>
        </div>
        <div className="right-box">
          <h3>PROBLEMATICA</h3>
          <p>
            Las estimaciones actuales suelen ser subjetivas y poco precisas.
          </p>
          <p>
            Se propone un modelo predictivo que optimice procesos y reduzca
            riesgos en la valuación de propiedades.
          </p>
        </div>
      </motion.section>

      {/* 🔹 Slide 3 - Propuesta y Valor */}
      <motion.section
        className="slide propuesta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>PROPUESTA Y VALOR</h2>
        <div className="text-box">
          <h3>Beneficios</h3>
          <ul>
            <li>Mayor precisión en la valuación de propiedades.</li>
            <li>Insights claros que apoyan decisiones comerciales y técnicas.</li>
            <li>Agilidad en la toma de decisiones estratégicas.</li>
          </ul>
        </div>
      </motion.section>

      {/* 🔹 Slide 4 - Arquitectura */}
      <motion.section
        className="slide arquitectura"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="slide-arquitectura">
          <div className="decor decor-top">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>

          <h2 className="arquitectura-titulo">ARQUITECTURA DE LA SOLUCION</h2>

          <div className="objetivos">
            <div className="objetivo">
              <div className="etiqueta">• F R O N T E N D •</div>
              <p>
                Interfaz construida en React permite que los usuarios carguen los datos de una vivienda mediante formularios.
                El frontend se comunica con el backend a través de llamadas fetch a los endpoints, mostrando el resultado en tiempo real.
              </p>
            </div>

            <div className="objetivo">
              <div className="etiqueta">• B A C K E N D •</div>
              <p>
                Servicio desarrollado en Python con FastAPI expone endpoints REST para consumir los modelos.
                Configuración de CORS para permitir la comunicación con el frontend en React.
              </p>
            </div>

            {/* Recuadro Celeste */}
            <div className="arquitectura-box">
              <p>
                El diseño modular permite escalar fácilmente y mantener una comunicación
                ágil entre React y FastAPI, asegurando rapidez y flexibilidad.
              </p>
            </div>
          </div>

          {/* Logos con react-icons */}
          <div className="arquitectura-logos">
            <SiPython />
            <SiReact />
            <SiFastapi />
            <SiNumpy />
          </div>

          <div className="decor decor-bottom">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </motion.section>

{/* 🔹 Slide 4.5 - Flujo de Interacción */}
<motion.section
  className="slide flujo"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8 }}
>
  <h2>FLUJO DE INTERACCIÓN</h2>
  <div className="flujo-container">
    <div className="flujo-item">
      <FaHome className="flujo-icon" />
      <p>Usuario</p>
    </div>
    <span className="flecha">→</span>
    <div className="flujo-item">
      <SiReact className="flujo-icon react" />
      <p>Frontend (React)</p>
    </div>
    <span className="flecha">→</span>
    <div className="flujo-item">
      <SiFastapi className="flujo-icon fastapi" />
      <p>Backend (FastAPI)</p>
    </div>
    <span className="flecha">→</span>
    <div className="flujo-item">
      <FaCogs className="flujo-icon" />
      <p>Modelo ML (Joblib)</p>
    </div>
    <span className="flecha">→</span>
    <div className="flujo-item">
      <SiReact className="flujo-icon react" />
      <p>Resultado al Usuario</p>
    </div>
  </div>
</motion.section>

      {/* 🔹 Slide 5 - EDA + ETL*/}
<motion.section
  className="slide eda estadistica"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  <div className="stat-card">
    {/* TOP-RIGHT DECOR */}
    <svg className="decor-svg decor-topright" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden>
      <circle cx="280" cy="80" r="36" fill="#61dafb"/>
      <circle cx="200" cy="110" r="20" fill="#61dafb"/>
      <circle cx="160" cy="300" r="12" fill="#61dafb"/>
    </svg>

    {/* BOTTOM-LEFT DECOR */}
    <svg className="decor-svg decor-bottomleft" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden>
      <circle cx="110" cy="280" r="40" fill="#61dafb"/>
      <circle cx="160" cy="300" r="12" fill="#61dafb"/>
    </svg>

    {/* Contenido centrado con texto de EDA */}
    <div className="stat-content">
      <h2>ANÁLISIS EXPLORATORIO DE DATOS</h2>
      <p>
        El dataset incluye características como calidad general,
        área habitable, baños, garaje, año de construcción y
        variables de contexto como barrio.
      </p>
      <img src={graficoEDA} alt="Gráfico Comparativo de Modelos" className="eda-image" />
      <p>
        Se identificaron correlaciones clave entre superficie,
        calidad y año de construcción con el precio final.
      </p>

      {/* 🔹 Aclaración sobre ETL */}
      <div className="etl-note">
        <h3>Proceso ETL de Enriquecimiento</h3>
        <p>
          Además del dataset original, se implementó un proceso <strong>ETL </strong> 
           para enriquecer los datos con información de <em>OpenStreetMap</em>. 
          Esto permitió agregar nuevas variables como el <strong>número de escuelas cercanas</strong>, 
          mejorando la capacidad predictiva de los modelos.
        </p>
      </div>
    </div>
  </div>
</motion.section>


      {/* 🔹 Slide 6 - Técnicas y Modelos */}
      <motion.section
        className="slide infografia"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>TÉCNICAS Y MODELOS</h2>
        <div className="infografia-content">
          {/* Lado izquierdo */}
          <div className="texto izquierda">
            <div className="item">
              <h3>01. Modelo Simple</h3>
              <p>
                Variables estructurales básicas: calidad de materiales, superficie
                total, número de baños.
              </p>
            </div>
            <div className="item">
              <h3>02. Modelo Enriquecido</h3>
              <p>
                Añade factores de contexto, como la cantidad de escuelas cercanas y
                características adicionales del entorno.
              </p>
            </div>
          </div>

          {/* Centro con iconos */}
          <div className="iconos">
            <div className="gota top-left">
              <FaSeedling className="icon" />
            </div>
            <div className="gota top-right">
              <FaHome className="icon" />
            </div>
            <div className="gota bottom-left">
              <FaProjectDiagram className="icon" />
            </div>
            <div className="gota bottom-right">
              <FaTags className="icon" />
            </div>
          </div>

          {/* Lado derecho */}
          <div className="texto derecha">
            <div className="item">
              <h3>03. Modelo Complejo</h3>
              <p>
                Incluye variables categóricas como el barrio
                (<em>Neighborhood</em>) y el estilo de la vivienda
                (<em>HouseStyle</em>), aumentando la precisión del modelo.
              </p>
            </div>
            <div className="item">
              <h3>04. Modelo Categorico</h3>
              <p>
                Agrupa viviendas en rangos de precio (Bajo, Medio, Alto) usando un
                Random Forest Classifier para facilitar la interpretación.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
