import joblib
import numpy as np
import pandas as pd

# Load trained model
MODEL_PATH = r"D:\TTTN_HKI2526\smart-heart-analyzer\models\heart-disease-prediction-model\heart_disease_pred_model.pkl"
model = joblib.load(MODEL_PATH)

def predict_symptom(data: dict):

    sex = 1 if data["sex"].lower() == "male" else 0
    cp = ["typical angina", "atypical angina", "non-anginal", "asymptomatic"].index(data["chest_pain_type"].lower())
    fbs = 1 if str(data["fasting_blood_sugar"]).lower() in ["true", "1", "yes"] else 0
    restecg = ["normal", "st-t abnormality", "left ventricular hypertrophy"].index(data["resting_ecg"].lower())
    exang = 1 if str(data["exercise_induced_angina"]).lower() in ["yes", "1", "true"] else 0
    slope = ["upsloping", "flat", "downsloping"].index(data["st_slope"].lower())
    thal = ["normal", "fixed defect", "reversible defect"].index(data["thalassemia"].lower()) + 1

    X = pd.DataFrame(np.array([[
        data["age"], sex, cp, data["resting_bp"], data["cholesterol"],
        fbs, restecg, data["max_heart_rate"], exang, data["st_depression"],
        slope, data["num_major_vessels"], thal
    ]]), columns=[
        "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
        "thalch", "exang", "oldpeak", "slope", "ca", "thal"
    ])

    pred = model.predict(X)[0]
    return {
        "result": "Heart Disease" if pred != 0 else "No Heart Disease",
        "severity": int(pred)
    }
