from fastapi import APIRouter, status, HTTPException

from app.schemas.user import UserCreate, UserResponse, UserLogin, Usertoken,PasswordChangeRequest
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

@auth.patch("/{user_id}/password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(user_id: str, payload: PasswordChangeRequest):
    """
    Đổi mật khẩu cho user theo id.
    """
    try:
        await UserService.change_password(
            user_id=user_id,
            old_password=payload.old_password,
            new_password=payload.new_password,
        )
    except LookupError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    except PermissionError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mật khẩu cũ không đúng",
        )

@auth.post("/logout")
async def logout():
    return {"message": "User logged out successfully"}


