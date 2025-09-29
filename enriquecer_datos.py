import pandas as pd
import requests
import time
from tqdm import tqdm

# --- CONFIGURACIÓN ---
INPUT_FILENAME = 'notebook/data/train.csv'
OUTPUT_FILENAME = 'notebook/data/train_enriquecido.csv'

# --- URLs Y CABECERAS ---
NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search"
OVERPASS_API_URL = "https://overpass-api.de/api/interpreter"
HEADERS = {'User-Agent': 'MiAppDeEnriquecimiento/1.0'}

def obtener_datos_locales(barrio, ciudad="Ames", estado="Iowa"):
    """
    Función que toma un nombre de barrio, obtiene sus coordenadas y cuenta
    las escuelas cercanas.
    """
    query_geo = f"{barrio}, {ciudad}, {estado}"
    params_geo = {'q': query_geo, 'format': 'json', 'limit': 1}
    
    try:
        response_geo = requests.get(NOMINATIM_API_URL, headers=HEADERS, params=params_geo)
        time.sleep(1) # Pausa obligatoria de 1 segundo
        
        if not (response_geo.status_code == 200 and response_geo.json()):
            return None

        lat = response_geo.json()[0].get('lat')
        lon = response_geo.json()[0].get('lon')

        overpass_query = f"[out:json];(node[amenity=school](around:1600,{lat},{lon});way[amenity=school](around:1600,{lat},{lon});relation[amenity=school](around:1600,{lat},{lon}););out count;"
        response_poi = requests.post(OVERPASS_API_URL, data={'data': overpass_query})
        time.sleep(1) # Pausa obligatoria de 1 segundo

        if response_poi.status_code == 200:
            results_poi = response_poi.json()
            total_escuelas = int(results_poi["elements"][0]["tags"]["total"])
            return total_escuelas
        else:
            return None
    except Exception as e:
        print(f"\nOcurrió un error en la API para el barrio '{barrio}': {e}")
        return None

# --- SCRIPT PRINCIPAL OPTIMIZADO ---

# Cargar el dataset
df = pd.read_csv(INPUT_FILENAME)

# 1. OBTENER LOS BARRIOS ÚNICOS
barrios_unicos = df['Neighborhood'].unique()
print(f"Se encontraron {len(barrios_unicos)} barrios únicos. Se realizarán {len(barrios_unicos)} llamadas a la API.")

# 2. CREAR UN DICCIONARIO CACHÉ PARA GUARDAR RESULTADOS
barrio_cache = {}

# 3. LLAMAR A LA API SOLO PARA LOS BARRIOS ÚNICOS
for barrio in tqdm(barrios_unicos, desc="Consultando APIs por barrio"):
    numero_escuelas = obtener_datos_locales(barrio)
    if numero_escuelas is not None:
        barrio_cache[barrio] = numero_escuelas
    else:
        barrio_cache[barrio] = 0 # Asignar 0 si la API falla o no encuentra nada

print("\nResultados obtenidos por barrio:")
print(barrio_cache)

# 4. APLICAR LOS RESULTADOS A TODO EL DATASET USANDO .map()
print("\nMapeando los resultados al DataFrame completo...")
df['NumeroDeEscuelasCercanas'] = df['Neighborhood'].map(barrio_cache)

# Rellenar cualquier posible nulo si algún barrio no estuviera en el caché
df['NumeroDeEscuelasCercanas'].fillna(0, inplace=True)

# 5. GUARDAR EL ARCHIVO FINAL
df.to_csv(OUTPUT_FILENAME, index=False)

print(f"\n¡Proceso completado! Dataset enriquecido guardado como '{OUTPUT_FILENAME}'.")