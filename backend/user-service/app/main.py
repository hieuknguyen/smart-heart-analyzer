#luon doc AI_GUIDELINES.md
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.users import router as users

from app.database.database import create_tables, initialize_database, _pool


app = FastAPI()

allowed_origins = [
    "https://quackquack.io.vn",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await initialize_database()
    await create_tables()

@app.on_event("shutdown")
async def on_shutdown():
    if _pool:
        _pool.close()
        await _pool.wait_closed()

app.include_router(users)
