import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

MODEL_PATH = r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\heart-disease-prediction-model\heart_disease_model.pkl"
model = joblib.load(MODEL_PATH)

def preprocess_input(user_input: dict):
    label_encoder = LabelEncoder()
    
    user_input['sex'] = label_encoder.fit_transform([user_input['sex']])[0]
    user_input['chest_pain_type'] = label_encoder.fit_transform([user_input['chest_pain_type']])[0]
    user_input['fasting_blood_sugar'] = label_encoder.fit_transform([user_input['fasting_blood_sugar']])[0]
    user_input['resting_ecg'] = label_encoder.fit_transform([user_input['resting_ecg']])[0]
    user_input['exercise_induced_angina'] = label_encoder.fit_transform([user_input['exercise_induced_angina']])[0]
    user_input['st_slope'] = label_encoder.fit_transform([user_input['st_slope']])[0]
    user_input['thalassemia'] = label_encoder.fit_transform([user_input['thalassemia']])[0]

    return user_input

def predict_heart_disease(data: dict):
    data = preprocess_input(data)

    X = pd.DataFrame(np.array([[
        data["age"], data["sex"], data["chest_pain_type"], data["resting_bp"],
        data["cholesterol"], data["fasting_blood_sugar"], data["resting_ecg"],
        data["max_heart_rate"], data["exercise_induced_angina"], data["st_depression"],
        data["st_slope"], data["num_major_vessels"], data["thalassemia"]
    ]]), columns=[
        "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalch", "exang", "oldpeak",
        "slope", "ca", "thal"
    ])
    
    pred = model.predict(X)[0]
    pred_proba = model.predict_proba(X)[0]

    return {
        "result": "Heart Disease" if pred == 1 else "No Heart Disease",
        "severity": int(pred),
        "probability": round(pred_proba[pred] * 100, 2)
    }
