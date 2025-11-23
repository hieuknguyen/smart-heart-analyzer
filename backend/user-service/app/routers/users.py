# dieu huong api
from fastapi import APIRouter
from app.routers.auth import auth as auth_router
from app.routers.profile import profile


router = APIRouter(prefix="/users")
router.include_router(profile)
router.include_router(auth_router)
