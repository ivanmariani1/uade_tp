# main.py
from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import pandas as pd
# --- 1. IMPORTAR EL MIDDLEWARE DE CORS ---
from fastapi.middleware.cors import CORSMiddleware

# Crear la instancia de la aplicación
app = FastAPI(
    title="API de Predicción de Precios de Casas", 
    description="Esta API expone dos modelos: uno complejo y uno simplificado.",
    version="3.0"
)

# --- 2. AÑADIR LA CONFIGURACIÓN DE CORS ---
# Orígenes permitidos (en este caso, tu app de React)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"], # Permite todas las cabeceras
)

# --- Cargar AMBOS modelos y sus columnas al iniciar ---
try:
    # (El resto de tu código se mantiene exactamente igual)
    # Modelo Complejo
    complex_model = joblib.load('models/house_price_model.pkl')
    complex_model_columns = joblib.load('models/model_columns.pkl')
    print("Modelo complejo cargado exitosamente.")
    
    # Modelo Simplificado
    simple_model = joblib.load('models/simple_model.pkl')
    simple_model_columns = joblib.load('models/simple_model_columns.pkl')
    print("Modelo simplificado cargado exitosamente.")

except Exception as e:
    print(f"Error al cargar los modelos: {e}")
    complex_model, simple_model = None, None


# --- 3. Definir los Pydantic Models para cada endpoint ---

# Modelo de entrada para el endpoint SIMPLIFICADO
class HouseFeaturesSimple(BaseModel):
    OverallQual: int
    GrLivArea: int
    TotalBsmtSF: int
    GarageCars: int
    GarageArea: int
    firstFlrSF: int = Field(..., alias='1stFlrSF')
    YearBuilt: int
    YearRemodAdd: int
    FullBath: int
    TotRmsAbvGrd: int

    class Config:
        populate_by_name = True
        json_schema_extra = {"example": {"OverallQual": 7, "GrLivArea": 1710, "TotalBsmtSF": 856, "GarageCars": 2, "GarageArea": 548, "1stFlrSF": 856, "YearBuilt": 2003, "YearRemodAdd": 2003, "FullBath": 2, "TotRmsAbvGrd": 8}}

# Modelo de entrada para el endpoint COMPLEJO (con más features)
class HouseFeaturesComplex(BaseModel):
    # Usaremos las 10 del simple + 5 categóricas importantes para demostrar
    OverallQual: int
    GrLivArea: int
    TotalBsmtSF: int
    GarageCars: int
    GarageArea: int
    firstFlrSF: int = Field(..., alias='1stFlrSF')
    YearBuilt: int
    YearRemodAdd: int
    FullBath: int
    TotRmsAbvGrd: int
    Neighborhood: str # Característica categórica
    HouseStyle: str   # Característica categórica
    SaleCondition: str # Característica categórica
    
    class Config:
        populate_by_name = True
        json_schema_extra = {"example": {"OverallQual": 7, "GrLivArea": 1710, "TotalBsmtSF": 856, "GarageCars": 2, "GarageArea": 548, "1stFlrSF": 856, "YearBuilt": 2003, "YearRemodAdd": 2003, "FullBath": 2, "TotRmsAbvGrd": 8, "Neighborhood": "CollgCr", "HouseStyle": "2Story", "SaleCondition": "Normal"}}


# --- 4. Crear los Endpoints ---

@app.get("/")
def read_root():
    return {"status": "API con dos modelos funcionando."}

# Endpoint para el modelo SIMPLIFICADO
@app.post("/predict/simple")
def predict_simple(features: HouseFeaturesSimple):
    if simple_model is None:
        return {"error": "El modelo simplificado no está cargado."}
    
    input_df = pd.DataFrame([features.dict(by_alias=True)])
    input_df = input_df[simple_model_columns]
    
    prediction = simple_model.predict(input_df)
    return {"predicted_price": prediction[0], "model_type": "simplified"}

# Endpoint para el modelo COMPLEJO
@app.post("/predict/complex")
def predict_complex(features: HouseFeaturesComplex):
    if complex_model is None:
        return {"error": "El modelo complejo no está cargado."}

    # El input del usuario se convierte a DataFrame
    input_df = pd.DataFrame([features.dict(by_alias=True)])
    
    # ¡Paso clave! Se aplica One-Hot Encoding a las columnas categóricas
    input_df_encoded = pd.get_dummies(input_df)
    
    # Se reindexa para que coincida exactamente con las 200+ columnas del modelo
    final_df = input_df_encoded.reindex(columns=complex_model_columns, fill_value=0)
    
    prediction = complex_model.predict(final_df)
    return {"predicted_price": prediction[0], "model_type": "complex"}