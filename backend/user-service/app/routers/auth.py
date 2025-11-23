from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.user import UserCreate, UserResponse, UserUpdate, UserLogin,UserChangePassword, Usertoken
from app.services.user_service import UserService

auth = APIRouter(prefix="/auth",tags=["auth"])

@auth.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create(user: UserCreate)-> UserResponse:
    created_user = await UserService.create(user)
    return created_user

@auth.post("/login", status_code=status.HTTP_200_OK)#, response_model=UserResponse)
async def login(user: UserLogin):#-> UserResponse:
    created_user = await UserService.login(user)
    return created_user

@auth.post("/token", status_code=status.HTTP_200_OK)
async def login_with_token(token: Usertoken):
        user = await UserService.login_with_token(token)
        return user
        # if not user:
        #     raise HTTPException(status_code=401, detail="Invalid email or password")
        # else:
        #     return user

@auth.put("/change-password", status_code=status.HTTP_201_CREATED)
async def change_password(user: UserChangePassword) -> bool:
    change_password = await UserService.change_password(user)
    return change_password

@auth.post("/logout")
async def logout():
    return {"message": "User logged out successfully"}


