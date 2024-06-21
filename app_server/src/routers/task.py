
import aiohttp
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from src.storages.mongo.models.task import Task, TaskCreate, TaskUpdate, Topic
from src.storages.mongo.repositories.task import task_repository

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
async def read_all() -> list[Task]:
    return await task_repository.read_all()


@router.patch("/{task_id}")
async def update(task_id: PydanticObjectId, task_update: TaskUpdate) -> Task | None:
    task = await task_repository.update(task_id, task_update)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task {task_id} does not exist")

    return task


@router.delete("/{task_id}")
async def delete(task_id: PydanticObjectId) -> Task | None:
    return await task_repository.delete(task_id)

