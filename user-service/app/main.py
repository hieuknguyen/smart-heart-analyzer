#luon doc AI_GUIDELINES.md
from fastapi import FastAPI
from app.routers.user_router import router as user_router
from app.database.database import create_tables, initialize_database, _pool



app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await initialize_database()
    await create_tables()

@app.on_event("shutdown")
async def on_shutdown():
    if _pool:
        _pool.close()
        await _pool.wait_closed()
        
app.include_router(user_router)