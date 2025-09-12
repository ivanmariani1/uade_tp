# 🏡 Predictor de Precios de Viviendas

Este es un proyecto full-stack de Machine Learning que predice el precio de venta de viviendas utilizando el dataset de Ames, Iowa de Kaggle.

## Características

- **Frontend**: Una interfaz interactiva creada con **React** que permite al usuario introducir datos y ver predicciones.
- **Backend**: Una API robusta desarrollada con **FastAPI** (Python) que sirve dos modelos de Machine Learning.
- **Modelos de ML**:
    1.  Un **modelo complejo** entrenado con más de 200 características.
    2.  Un **modelo simplificado** entrenado con las 10 características más importantes para facilitar su uso.
- **Arquitectura**: El sistema utiliza un enfoque de microservicios, donde el frontend de React se comunica con la API de Python.

## Tecnologías Utilizadas

- **Frontend**: React.js, JavaScript, CSS
- **Backend**: FastAPI, Python
- **Machine Learning**: Scikit-learn, Pandas, Joblib
- **Servidor**: Uvicorn

## Cómo Ejecutarlo Localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://URL-DE-TU-REPO.git](https://URL-DE-TU-REPO.git)
    cd nombre-del-repositorio
    ```
2.  **Ejecutar el Backend (Python):**
    ```bash
    cd backend
    python -m venv venv
    # Activar el entorno (venv\Scripts\activate en Windows o source venv/bin/activate en Mac/Linux)
    pip install -r requirements.txt # (Asegúrate de crear este archivo con 'pip freeze > requirements.txt')
    uvicorn main:app --reload
    ```
3.  **Ejecutar el Frontend (React):**
    ```bash
    cd frontend
    npm install
    npm start
    ```