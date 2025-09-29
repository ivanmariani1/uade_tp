import React, { useState } from 'react';
import './App.css';
import Presentacion from './Presentacion';

// Diccionario de traducciones para las etiquetas del formulario
const translations = {
  OverallQual: 'Calidad General',
  GrLivArea: 'Área Habitable (pies²)',
  TotalBsmtSF: 'Área Sótano (pies²)',
  GarageCars: 'Capacidad del Garaje (autos)',
  GarageArea: 'Área del Garaje (pies²)',
  '1stFlrSF': 'Área del Primer Piso (pies²)',
  YearBuilt: 'Año de Construcción',
  YearRemodAdd: 'Año de Remodelación',
  FullBath: 'Baños Completos',
  TotRmsAbvGrd: 'Habitaciones Totales',
  Neighborhood: 'Barrio',
  HouseStyle: 'Estilo de Vivienda',
  SaleCondition: 'Condición de Venta',
  NumeroDeEscuelasCercanas: 'Escuelas Cercanas (en radio de 1 milla)',
};

function App() {
  // Estado del menú lateral: "presentacion", "modelos", "visualizacion"
  const [activeTab, setActiveTab] = useState('presentacion');

  // Estado para los datos del formulario (incluye todos los campos posibles)
  const [modelType, setModelType] = useState('enriched');
  const [formData, setFormData] = useState({
    OverallQual: 7,
    GrLivArea: 1710,
    TotalBsmtSF: 856,
    GarageCars: 2,
    GarageArea: 548,
    '1stFlrSF': 856,
    YearBuilt: 2003,
    YearRemodAdd: 2003,
    FullBath: 2,
    TotRmsAbvGrd: 8,
    // Campo para el modelo enriquecido
    NumeroDeEscuelasCercanas: 3, 
    // Campos para el modelo complejo
    Neighborhood: 'CollgCr',
    HouseStyle: '2Story',
    SaleCondition: 'Normal',
  });

  // Estado para guardar la predicción, errores y estado de carga
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');

    const endpoint = `http://127.0.0.1:8000/predict/${modelType}`;

    // Construir el payload correcto según el modelo seleccionado
    let payload = {};
    const simpleFields = ['OverallQual', 'GrLivArea', 'TotalBsmtSF', 'GarageCars', 'GarageArea', '1stFlrSF', 'YearBuilt', 'YearRemodAdd', 'FullBath', 'TotRmsAbvGrd'];

    if(modelType==='simple') simpleFields.forEach(f=>payload[f]=formData[f]);
    else if(modelType==='enriched') [...simpleFields,'NumeroDeEscuelasCercanas'].forEach(f=>payload[f]=formData[f]);
    else [...simpleFields,'Neighborhood','HouseStyle','SaleCondition'].forEach(f=>payload[f]=formData[f]);

    try {
      const response = await fetch(endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('La respuesta de la red no fue exitosa.');
      const data = await response.json();
      if (data.predicted_price) {
        setPrediction(data.predicted_price);
      } else {
        setError(data.error || 'Ocurrió un error desconocido.');
      }
    } catch (err) {
      setError('No se pudo conectar con la API. ¿Está el servidor de backend funcionando?');
    } finally {
      setLoading(false);
    }
  };

  // Renderiza los campos del formulario dinámicamente
  const renderFormFields = () => {
    const simpleFields = ['OverallQual', 'GrLivArea', 'TotalBsmtSF', 'GarageCars', 'GarageArea', '1stFlrSF', 'YearBuilt', 'YearRemodAdd', 'FullBath', 'TotRmsAbvGrd'];
    const complexOnlyFields = ['Neighborhood', 'HouseStyle', 'SaleCondition'];
    const enrichedOnlyField = 'NumeroDeEscuelasCercanas';

    return (
      <>
        {simpleFields.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input type="number" name={f} value={formData[f]} onChange={handleChange} required/>
          </div>
        ))}
        {modelType==='enriched' && (
          <div className="form-group" key={enrichedOnlyField}>
            <label>{translations[enrichedOnlyField]}</label>
            <input type="number" name={enrichedOnlyField} value={formData[enrichedOnlyField]} onChange={handleChange} required/>
          </div>
        )}
        {modelType==='complex' && complexOnlyFields.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input type="text" name={f} value={formData[f]} onChange={handleChange} required/>
          </div>
        ))}
      </>
    );
  };

  // Contenido según la pestaña seleccionada
  const renderContent = () => {
    switch(activeTab){
      case 'presentacion':
        return <Presentacion />;
      case 'modelos':
        return (
          <div>
            <div className="model-selector">
              <label>
                <input type="radio" value="simple" checked={modelType==='simple'} onChange={e=>setModelType(e.target.value)}/>
                Modelo Simple
              </label>
              <label>
                <input type="radio" value="complex" checked={modelType==='complex'} onChange={e=>setModelType(e.target.value)}/>
                Modelo Complejo
              </label>
              <label>
                <input type="radio" value="enriched" checked={modelType==='enriched'} onChange={e=>setModelType(e.target.value)}/>
                Modelo Enriquecido ✨
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">{renderFormFields()}</div>
              <button type="submit" disabled={loading}>{loading ? 'Prediciendo...' : 'Predecir Precio'}</button>
            </form>

            {prediction!==null && (
              <div className="result">
                <h2>Precio Estimado:</h2>
                <p>${new Intl.NumberFormat('es-AR',{maximumFractionDigits:2}).format(prediction)}</p>
              </div>
            )}
            {error && <div className="error"><p>{error}</p></div>}
          </div>
        );
      case 'visualizacion':
        return <div>
          <h2>Visualización de Datos</h2>
          <p>Aquí irán los gráficos y análisis de datos.</p>
        </div>;
      default: return null;
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <button onClick={()=>setActiveTab('presentacion')} className={activeTab==='presentacion'?'active':''}>Presentación</button>
        <button onClick={()=>setActiveTab('modelos')} className={activeTab==='modelos'?'active':''}>Modelos</button>
        <button onClick={()=>setActiveTab('visualizacion')} className={activeTab==='visualizacion'?'active':''}>Visualización de Datos</button>
      </aside>
      <main className="main-content">
        <header>
          <h1>Predictor de Precios de Viviendas</h1>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
