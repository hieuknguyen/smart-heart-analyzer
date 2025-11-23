# dieu huong api
from fastapi import APIRouter

from app.routers.profile import profile


router = APIRouter(prefix="/users")
router.include_router(profile)

