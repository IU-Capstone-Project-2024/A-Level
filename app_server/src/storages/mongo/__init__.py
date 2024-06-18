from beanie import init_beanie
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from src.storages.mongo.models.task import Task
from src.storages.mongo.models.document import Document_


async def lifespan(app: FastAPI):
    motor_client = AsyncIOMotorClient("mongodb://db:27017/")
    database = motor_client.get_database("a-level-exam")
    await init_beanie(database=database, document_models=[Task, Document_])
    yield

    motor_client.close()
