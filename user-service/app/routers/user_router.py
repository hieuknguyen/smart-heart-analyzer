#dieu huong api
from fastapi import APIRouter, HTTPException, status
from typing import List

from app.schemas.user import UserCreate, UserResponse, UserUpdate, UserLogin
from app.services.user_service import UserService

router = APIRouter(prefix="", tags=["users"])



@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create_user(user: UserCreate)-> UserResponse:
    created_user = await UserService.create_user(user)
    return created_user

@router.get("/", response_model=List[UserResponse])
async def get_users():
    return await UserService.get_all_users()

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    user = await UserService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user_update: UserUpdate):
    if await UserService.get_user_by_email(user_update.email) or await UserService.get_user_by_username(user_update.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    updated_user = await UserService.update_user(user_id, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str):
    if not await UserService.delete_user(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

@router.post("/login",response_model = UserResponse)#,response_model= UserLogin, status_code=status.HTTP_200_OK)
async def login(login_data: UserLogin):
        user = await UserService.login(login_data.email, login_data.password)#UserService.get_user_by_username(db, login_data.username) and
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        else:
            return user
