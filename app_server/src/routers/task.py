import logging
import aiohttp
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from src.storages.mongo.models.task import Task, TaskCreate, TaskUpdate, Topic
from src.storages.mongo.repositories.task import task_repository
from src.storages.mongo.repositories.utils import utils_repository

file_handler = logging.FileHandler('task-router.log')
file_handler.setLevel(logging.INFO)  
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)


logging.getLogger('').addHandler(file_handler)

router = APIRouter(prefix="/task", tags=["Task"])


@router.post("/")
async def create(task: TaskCreate) -> Task:
    return await task_repository.create(task)


@router.get("/{task_id}")
async def read(task_id: PydanticObjectId) -> Task | None:
    task = await task_repository.read(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task {task_id} does not exist")

    return task


@router.get("/")
async def read_all(offset: int=None, length: int=None, marks: list[int]=None, topic: list[int]=None, year: list[int]=None ) -> list[Task]:

    if (offset is None) ^ (length is None):
            raise HTTPException(statuse_code=400, detail="Bad request: must specify either both offset and length or None of them")

    response = await task_repository.read_all()

    return response if length is None else response[offset * length: (offset + 1) * length] 


@router.patch("/{task_id}")
async def update(task_id: PydanticObjectId, task_update: TaskUpdate) -> Task | None:
    task = await task_repository.read(task_id=task_id)
    if task.year != task_update.year:
        utils_repository.delete_year(task.year)
        utils_repository.update_years(task_update.year)
    
    task = await task_repository.update(task_id, task_update)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task {task_id} does not exist")
        
    return task


@router.delete("/{task_id}")
async def delete(task_id: PydanticObjectId):
    return await task_repository.delete(task_id)


@router.get("/{task_id}/predict")
async def predict(task_id: PydanticObjectId):
    task = await task_repository.read(task_id)
    if task is None:
        return HTTPException(status_code=404, detail=f"Task {task_id} does not exists")

    data = {"request": task.content}
    url = "http://model:8000/predict"
    
    async with aiohttp.ClientSession(trust_env=True) as session:
        async with session.post(url, json=data) as response:
            result = await response.json()

            task.topic = Topic(result['topic_id'])
            await task_repository.update(task.id, task)
            return result

