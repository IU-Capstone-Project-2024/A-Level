from fastapi import FastAPI
from src.routers import document
from src.storages.mongo import lifespan


app = FastAPI(lifespan=lifespan)
app.include_router(document.router)
