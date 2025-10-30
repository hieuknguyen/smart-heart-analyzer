from sqlalchemy.orm import Session
from server.data.models import HeartDiseaseResult, ECGResult

def save_heart_disease_result(db: Session, data: dict, result: dict):
    record = HeartDiseaseResult(**data, result=result.get("result"), severity=result.get("severity"))
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def save_ecg_result(db: Session, file_name: str, result: dict):
    record = ECGResult(file_name=file_name, result=result.get("result"), confidence=result.get("severity"))
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def get_heart_disease_history(db: Session, limit: int = 20):
    return (
        db.query(HeartDiseaseResult)
        .order_by(HeartDiseaseResult.created_at.desc())
        .limit(limit)
        .all()
    )


def get_ecg_history(db: Session, limit: int = 20):
    return (
        db.query(ECGResult)
        .order_by(ECGResult.created_at.desc())
        .limit(limit)
        .all()
    )