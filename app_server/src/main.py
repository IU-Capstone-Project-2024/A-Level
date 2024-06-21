from fastapi import FastAPI
from src.routers import document, task
from src.storages.mongo import lifespan
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"] 
)

app.include_router(document.router)
app.include_router(task.router)


