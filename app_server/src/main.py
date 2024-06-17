from fastapi import FastAPI
from src.routers import document
from src.storages.mongo import lifespan
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your actual allowed origins
    allow_credentials=True,
    allow_methods=["*"],   # Replace with your allowed methods
    allow_headers=["*"]    # Replace with your allowed headers
)

app.include_router(document.router)


