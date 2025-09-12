import React, { useState } from 'react';
import './App.css';

// Diccionario de traducciones para los campos del formulario
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
};

function App() {
  const [modelType, setModelType] = useState('simple');
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
    Neighborhood: 'CollgCr',
    HouseStyle: '2Story',
    SaleCondition: 'Normal',
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');

    const endpoint = `http://127.0.0.1:8000/predict/${modelType}`;
    
    let payload = {};
    if (modelType === 'simple') {
      const { OverallQual, GrLivArea, TotalBsmtSF, GarageCars, GarageArea, '1stFlrSF': firstFlrSF, YearBuilt, YearRemodAdd, FullBath, TotRmsAbvGrd } = formData;
      payload = { OverallQual, GrLivArea, TotalBsmtSF, GarageCars, GarageArea, '1stFlrSF': firstFlrSF, YearBuilt, YearRemodAdd, FullBath, TotRmsAbvGrd };
    } else {
      payload = formData;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  const renderFormFields = () => {
    const simpleFields = ['OverallQual', 'GrLivArea', 'TotalBsmtSF', 'GarageCars', 'GarageArea', '1stFlrSF', 'YearBuilt', 'YearRemodAdd', 'FullBath', 'TotRmsAbvGrd'];
    const complexOnlyFields = ['Neighborhood', 'HouseStyle', 'SaleCondition'];
    
    return (
      <>
        {simpleFields.map(field => (
          <div className="form-group" key={field}>
            <label>{translations[field]}</label>
            <input type="number" name={field} value={formData[field]} onChange={handleChange} required />
          </div>
        ))}
        {modelType === 'complex' && complexOnlyFields.map(field => (
          <div className="form-group" key={field}>
            <label>{translations[field]}</label>
            <input type="text" name={field} value={formData[field]} onChange={handleChange} required />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Predictor de Precios de Viviendas</h1>
        <div className="model-selector">
          <label>
            <input type="radio" value="simple" checked={modelType === 'simple'} onChange={(e) => setModelType(e.target.value)} />
            Modelo Simple
          </label>
          <label>
            <input type="radio" value="complex" checked={modelType === 'complex'} onChange={(e) => setModelType(e.target.value)} />
            Modelo Complejo
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {renderFormFields()}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Prediciendo...' : 'Predecir Precio'}</button>
        </form>

        {prediction !== null && (
          <div className="result">
            <h2>Precio Estimado:</h2>
            <p>${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(prediction)}</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;