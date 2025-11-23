from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import UserService

profile = APIRouter(prefix="/profile", tags=["profile"])
@profile.put("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def edit_profile(user_id: str, profile_data: UserUpdate):
    try:
        updated_user = await UserService.edit_profile(user_id, profile_data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc)
        )
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user
