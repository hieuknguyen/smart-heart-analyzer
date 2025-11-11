#luon doc AI_GUIDELINES.md
from fastapi import FastAPI
from app.routers.users import router as users
from app.database.database import create_tables, initialize_database, _pool
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc ["http://localhost:3000"] nếu bạn có frontend riêng
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức: GET, POST, PUT, DELETE, OPTIONS,...
    allow_headers=["*"],  # Cho phép mọi header (bao gồm Authorization)
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