from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.api.endpoint import router as prediction_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)

@app.get("/")
def root():
    return {"message": "Server is running"}
