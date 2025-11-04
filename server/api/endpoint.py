from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session
import os, shutil
from server.data.database import get_db
from server.predict.heart_disease_predictor import predict_symptom
from server.predict.ecg_predictor import ECGPredictor
from server.services.predict_service import save_heart_disease_result, save_ecg_result

router = APIRouter(prefix="/api/v1/prediction", tags=["Prediction"])
ecg_model = ECGPredictor()

@router.post("/heart_disease")
async def predict_heart_disease_api(
    age: int = Form(...),
    sex: str = Form(...),
    chest_pain_type: str = Form(...),
    resting_bp: int = Form(...),
    cholesterol: int = Form(...),
    fasting_blood_sugar: str = Form(...),
    resting_ecg: str = Form(...),
    max_heart_rate: int = Form(...),
    exercise_induced_angina: str = Form(...),
    st_depression: float = Form(...),
    st_slope: str = Form(...),
    num_major_vessels: int = Form(...),
    thalassemia: str = Form(...),
    db: Session = Depends(get_db),
):
    data = {
        "age": age, "sex": sex, "chest_pain_type": chest_pain_type,
        "resting_bp": resting_bp, "cholesterol": cholesterol,
        "fasting_blood_sugar": fasting_blood_sugar, "resting_ecg": resting_ecg,
        "max_heart_rate": max_heart_rate, "exercise_induced_angina": exercise_induced_angina,
        "st_depression": st_depression, "st_slope": st_slope,
        "num_major_vessels": num_major_vessels, "thalassemia": thalassemia,
    }
    result = predict_symptom(data)
    save_heart_disease_result(db, data, result)
    return {"type": "heart_disease", "prediction": result}


@router.post("/ecg")
async def predict_ecg_api(file: UploadFile = File(...), db: Session = Depends(get_db)):
    os.makedirs("data/uploads", exist_ok=True)
    file_path = os.path.join("data/uploads", file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    result = ecg_model.predict(file_path)
    save_ecg_result(db, file.filename, result)
    return {"type": "ecg", "prediction": result}

@router.post("/chatbot")
async def chatbot_api(message: str = Form(...), db: Session = Depends(get_db)):
    reply = generate_response(message)
    save_chat_history(db, message, reply)
    return {"type": "chatbot", "user_message": message, "bot_reply": reply}


@router.get("/history/heart_disease")
async def get_heart_disease_history_api(db: Session = Depends(get_db)):
    results = get_heart_disease_history(db)
    return {"type": "heart_disease", "history": results}


@router.get("/history/ecg")
async def get_ecg_history_api(db: Session = Depends(get_db)):
    results = get_ecg_history(db)
    return {"type": "ecg", "history": results}

@router.get("/chatbot/history")
async def chatbot_history_api(db: Session = Depends(get_db)):
    chats = get_chat_history(db)
    return {"type": "chatbot", "history": chats}