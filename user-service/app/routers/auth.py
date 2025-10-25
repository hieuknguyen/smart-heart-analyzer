from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.user import UserCreate, UserResponse, UserUpdate, UserLogin
from app.services.user_service import UserService

auth = APIRouter(prefix="/auth")

@auth.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create(user: UserCreate)-> UserResponse:
    created_user = await UserService.create(user)
    return created_user

@auth.post("/login", status_code=status.HTTP_201_CREATED)#, response_model=UserResponse)
async def create(user: UserLogin):#-> UserResponse:
    created_user = await UserService.login(user)
    return created_user

@auth.post("/logout")
async def logout():
    return {"message": "User logged out successfully"}


