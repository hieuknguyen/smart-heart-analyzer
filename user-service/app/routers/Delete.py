from fastapi import APIRouter

Delete = APIRouter(prefix="")

@Delete.delete("/")
def get_abc():
    return {"message": "Đây là /users/abc"}
