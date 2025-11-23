#dieu huong api
from fastapi import APIRouter

from app.routers.profile import profile
from app.routers.auth import auth

router = APIRouter(prefix="/users")
router.include_router(profile)
router.include_router(auth)
