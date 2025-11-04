from sqlalchemy import Column, Integer, String, Float, Text, DateTime, func
from sqlalchemy.sql import func
from server.data.database import Base

class HeartDiseaseResult(Base):
    __tablename__ = "heart_disease_result"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer)
    sex = Column(String(10))
    chest_pain_type = Column(String(50))
    resting_bp = Column(Integer)
    cholesterol = Column(Integer)
    fasting_blood_sugar = Column(String(10))
    resting_ecg = Column(String(50))
    max_heart_rate = Column(Integer)
    exercise_induced_angina = Column(String(10))
    st_depression = Column(Float)
    st_slope = Column(String(20))
    num_major_vessels = Column(Integer)
    thalassemia = Column(String(50))
    result = Column(String(255))
    severity = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ECGResult(Base):
    __tablename__ = "ecg_result"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String(255))
    result = Column(String(255))
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(Text, nullable=False)
    bot_reply = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())