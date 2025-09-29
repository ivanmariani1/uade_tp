# main.py
from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API de Predicción de Precios de Casas",
    description="Expone tres modelos: complejo, simple y enriquecido.",
    version="4.0"
)

# --- CONFIGURACIÓN DE CORS ---
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Cargar TODOS los modelos al iniciar ---
try:
    complex_model = joblib.load('models/house_price_model.pkl')
    complex_model_columns = joblib.load('models/model_columns.pkl')
    
    simple_model = joblib.load('models/simple_model.pkl')
    simple_model_columns = joblib.load('models/simple_model_columns.pkl')
    
    enriched_model = joblib.load('models/enriched_simple_model.pkl')
    enriched_model_columns = joblib.load('models/enriched_simple_model_columns.pkl')
    
    categorical_model = joblib.load('models/house_price_classifier.pkl') 
    categorical_model_columns = joblib.load('models/classifier_features.pkl')    
    print("Todos los modelos cargados exitosamente.")
except Exception as e:
    print(f"Error al cargar los modelos: {e}")
    complex_model, simple_model, enriched_model = None, None, None

# --- Modelos de Entrada (Pydantic) ---
# (HouseFeaturesSimple y HouseFeaturesComplex se mantienen igual)
class HouseFeaturesSimple(BaseModel):
    OverallQual: int; GrLivArea: int; TotalBsmtSF: int; GarageCars: int;
    GarageArea: int; firstFlrSF: int = Field(..., alias='1stFlrSF');
    YearBuilt: int; YearRemodAdd: int; FullBath: int; TotRmsAbvGrd: int
    class Config: populate_by_name = True

class HouseFeaturesComplex(BaseModel):
    OverallQual: int; GrLivArea: int; TotalBsmtSF: int; GarageCars: int;
    GarageArea: int; firstFlrSF: int = Field(..., alias='1stFlrSF');
    YearBuilt: int; YearRemodAdd: int; FullBath: int; TotRmsAbvGrd: int
    Neighborhood: str; HouseStyle: str; SaleCondition: str
    class Config: populate_by_name = True

# NUEVO: Modelo de entrada para el modelo enriquecido (11 features)
class HouseFeaturesEnriched(BaseModel):
    OverallQual: int; GrLivArea: int; TotalBsmtSF: int; GarageCars: int;
    GarageArea: int; firstFlrSF: int = Field(..., alias='1stFlrSF');
    YearBuilt: int; YearRemodAdd: int; FullBath: int; TotRmsAbvGrd: int
    NumeroDeEscuelasCercanas: int
    class Config: populate_by_name = True

class HouseFeaturesCategorical(BaseModel):
    OverallQual: int; GrLivArea: int; TotalBsmtSF: int; GarageCars: int
    GarageArea: int; firstFlrSF: int = Field(..., alias='1stFlrSF')
    YearBuilt: int; YearRemodAdd: int; FullBath: int; TotRmsAbvGrd: int
    Neighborhood: str; HouseStyle: str; BldgType: str; MSZoning: str
    class Config: populate_by_name = True

# --- Endpoints ---
@app.get("/")
def read_root(): return {"status": "API con tres modelos funcionando."}

@app.post("/predict/simple")
def predict_simple(features: HouseFeaturesSimple):
    # ... (sin cambios)
    input_df = pd.DataFrame([features.dict(by_alias=True)])
    input_df = input_df[simple_model_columns]
    prediction = simple_model.predict(input_df)
    return {"predicted_price": prediction[0], "model_type": "simplified"}

@app.post("/predict/complex")
def predict_complex(features: HouseFeaturesComplex):
    # ... (sin cambios)
    input_df = pd.DataFrame([features.dict(by_alias=True)])
    input_df_encoded = pd.get_dummies(input_df)
    final_df = input_df_encoded.reindex(columns=complex_model_columns, fill_value=0)
    prediction = complex_model.predict(final_df)
    return {"predicted_price": prediction[0], "model_type": "complex"}

@app.post("/predict/enriched")
def predict_enriched(features: HouseFeaturesEnriched):
    if enriched_model is None: return {"error": "El modelo enriquecido no está cargado."}
    input_df = pd.DataFrame([features.dict(by_alias=True)])
    input_df = input_df[enriched_model_columns]
    prediction = enriched_model.predict(input_df)
    return {"predicted_price": prediction[0], "model_type": "enriched"}

# --- NUEVO ENDPOINT CATEGÓRICO --- 
@app.post("/predict/categorical") 
def predict_categorical(features: HouseFeaturesCategorical): 
    if categorical_model is None: return {"error": "El modelo categórico no está cargado."} 
    input_df = pd.DataFrame([features.dict(by_alias=True)]) 
    print(input_df)
    input_df = input_df[categorical_model_columns] 
    prediction = categorical_model.predict(input_df) 
    return {"predicted_price": str(prediction[0]), "model_type": "categorical"}