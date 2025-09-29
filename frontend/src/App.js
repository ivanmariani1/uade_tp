import React, { useState } from 'react';
import './App.css';
import Presentacion from './Presentacion';
import Visualizacion from './Visualizacion';
import ETL from './ETL';
import './ETL.css'; // Importa los nuevos estilos

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
  BldgType: 'Tipo de Edificación',
  MSZoning: 'Zonificación',
};

function App() {
  const [activeTab, setActiveTab] = useState('presentacion');
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
    NumeroDeEscuelasCercanas: 3,
    Neighborhood: 'CollgCr',
    HouseStyle: '2Story',
    SaleCondition: 'Normal',
    BldgType: '1Fam',
    MSZoning: 'RL',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsed = type === 'number' ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: parsed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');

    const endpoint = `http://127.0.0.1:8000/predict/${modelType}`;
    const simpleFields = [
      'OverallQual', 'GrLivArea', 'TotalBsmtSF', 'GarageCars',
      'GarageArea', '1stFlrSF', 'YearBuilt', 'YearRemodAdd',
      'FullBath', 'TotRmsAbvGrd'
    ];

    let fields = [];
    if (modelType === 'simple') {
      fields = simpleFields;
    } else if (modelType === 'enriched') {
      fields = [...simpleFields, 'NumeroDeEscuelasCercanas'];
    } else if (modelType === 'complex') {
      fields = [...simpleFields, 'Neighborhood', 'HouseStyle', 'SaleCondition'];
    } else if (modelType === 'categorical') {
      fields = [...simpleFields, 'Neighborhood', 'HouseStyle', 'BldgType', 'MSZoning'];
    }

    const payload = {};
    fields.forEach(f => payload[f] = formData[f]);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error de red');
      const data = await res.json();

      if (modelType === 'categorical' && data.predicted_category) {
        setPrediction(data.predicted_category);
      } else if (data.predicted_price) {
        setPrediction(data.predicted_price);
      } else {
        setError(data.error || 'Ocurrió un error desconocido.');
      }
    } catch {
      setError('No se pudo conectar con la API. ¿Está el backend funcionando?');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    const simpleFields = [
      'OverallQual','GrLivArea','TotalBsmtSF','GarageCars','GarageArea',
      '1stFlrSF','YearBuilt','YearRemodAdd','FullBath','TotRmsAbvGrd'
    ];
    const enrichedOnly = ['NumeroDeEscuelasCercanas'];
    const complexOnly = ['Neighborhood','HouseStyle','SaleCondition'];
    const categoricalOnly = ['Neighborhood','HouseStyle','BldgType','MSZoning'];

    return (
      <>
        {simpleFields.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input
              type="number"
              name={f}
              value={formData[f]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        {modelType === 'enriched' && enrichedOnly.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input
              type="number"
              name={f}
              value={formData[f]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        {modelType === 'complex' && complexOnly.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input
              type="text"
              name={f}
              value={formData[f]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        {modelType === 'categorical' && categoricalOnly.map(f=>(
          <div className="form-group" key={f}>
            <label>{translations[f]}</label>
            <input
              type="text"
              name={f}
              value={formData[f]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'presentacion':
        return <Presentacion />;
      case 'modelos':
        return (
          <div>
            <div className="model-selector">
              {['simple','complex','enriched','categorical'].map(m => (
                <label key={m}>
                  <input
                    type="radio"
                    value={m}
                    checked={modelType === m}
                    onChange={e => setModelType(e.target.value)}
                  />
                  {m === 'simple' && 'Modelo Simple'}
                  {m === 'complex' && 'Modelo Complejo'}
                  {m === 'enriched' && 'Modelo Enriquecido'}
                  {m === 'categorical' && 'Modelo Categórico'}
                </label>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">{renderFormFields()}</div>
              <button type="submit" disabled={loading}>
                {loading ? 'Prediciendo...' : 
                 modelType === 'categorical' ? 'Predecir Categoría' : 'Predecir Precio'}
              </button>
            </form>

            {prediction !== null && (
              <div className="result">
                {modelType === 'categorical' ? (
                  <>
                    <h2>Categoría de Precio Estimada:</h2>
                    <p>{prediction}</p>
                  </>
                ) : (
                  <>
                    <h2>Precio Estimado:</h2>
                    <p>${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(prediction)}</p>
                  </>
                )}
              </div>
            )}

            {error && <div className="error"><p>{error}</p></div>}
          </div>
        );
      case 'visualizacion':
        return <Visualizacion />;
      case 'etl': 
        return <ETL />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <button onClick={() => setActiveTab('presentacion')}
                className={activeTab==='presentacion' ? 'active' : ''}>Presentación</button>
        <button onClick={() => setActiveTab('modelos')}
                className={activeTab==='modelos' ? 'active' : ''}>Modelos</button>
        <button onClick={() => setActiveTab('visualizacion')}
                className={activeTab==='visualizacion' ? 'active' : ''}>Visualización de Datos</button>
        <button onClick={() => setActiveTab('etl')}
            className={activeTab==='etl' ? 'active' : ''}>Proceso ETL</button>
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
