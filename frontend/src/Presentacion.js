// src/Presentacion.js
import React from "react";
import { motion } from "framer-motion";
import "./Presentacion.css";
import { FaChartLine, FaUsers, FaCogs } from "react-icons/fa";
import { SiPython, SiFastapi, SiReact, SiNumpy } from "react-icons/si"; 

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
        <h1>Propuesta de Negocio</h1>
        <h2>Predicción de Precios de Viviendas</h2>
        <p className="autor">Equipo de Desarrollo - 2025</p>
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
          <h2>Dominio del Negocio</h2>
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
          <h3>Problemática</h3>
          <p>
            Las estimaciones actuales suelen ser subjetivas y poco precisas.
          </p>
          <p>
            Se propone un modelo predictivo que optimice procesos y reduzca
            riesgos en la valuación de propiedades.
          </p>
        </div>
      </motion.section>

      {/* 🔹 Segunda Slide: Propuesta y Valor */}
      <motion.section
        className="slide propuesta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Propuesta y Valor</h2>
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
<div class="slide-arquitectura">
  <div class="decor decor-top">
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
  </div>

  <h2 class="arquitectura-titulo">ARQUITECTURA DE LA SOLUCION</h2>

  <div class="objetivos">
    <div class="objetivo">
      <div class="etiqueta">• F R O N T E N D </div>
      <p>
        Interfaz construida en React permite que los usuarios carguen los datos de una vivienda mediante formularios.
        El frontend se comunica con el backend a través de llamadas fetch a los endpoints, mostrando el resultado en tiempo real.
      </p>
    </div>

    <div class="objetivo">
      <div class="etiqueta">• B A C K E N D </div>
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

  <div class="decor decor-bottom">
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
</div>
</motion.section>

      {/* 🔹 Slide 5 - EDA */}
      <motion.section
        className="slide eda"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Análisis Exploratorio de Datos</h2>
        <p>
          El dataset incluye características como calidad general,
          área habitable, baños, garaje, año de construcción y
          variables de contexto como barrio.
        </p>
        <img src="ruta/a/grafico.png" alt="EDA" />
        <p>
          Se identificaron correlaciones clave entre superficie,
          calidad y año de construcción con el precio final.
        </p>
      </motion.section>

      {/* 🔹 Slide 6 - Técnicas y Modelos */}
      <motion.section
        className="slide modelos"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Técnicas y Modelos</h2>
        <div className="estrategia-cards">
          <div className="card">
            <FaChartLine className="icon" />
            <h3>Modelo Simple</h3>
            <p>Variables estructurales básicas (calidad, superficie, baños).</p>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <h3>Modelo Enriquecido</h3>
            <p>Añade contexto como número de escuelas cercanas.</p>
          </div>
          <div className="card">
            <FaCogs className="icon" />
            <h3>Modelo Complejo</h3>
            <p>Incluye variables categóricas como barrio y estilo de vivienda.</p>
          </div>
        </div>
      </motion.section>




    </div>
  );
}
