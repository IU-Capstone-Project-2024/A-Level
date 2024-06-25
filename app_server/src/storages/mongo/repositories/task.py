from beanie import PydanticObjectId
from src.storages.mongo.models.task import Task, TaskCreate, TaskUpdate


class TaskRepository:
    async def create(self, task: TaskCreate) -> Task:
        task = Task(**task.model_dump())
        return await task.save()

    async def read(self, task_id: PydanticObjectId) -> Task | None:
        return await Task.find_one({"_id": task_id})

    async def read_all(self) -> list[Task]:
        return await Task.find().to_list()

    async def update(self, task_id: PydanticObjectId, task_update: TaskUpdate) -> Task | None:
        task = await Task.find_one({"_id": task_id})
        if task is None:
            return None

        return await task.set(task_update.model_dump())

    async def delete(self, task_id: PydanticObjectId):
        task = await Task.find_one({"_id": task_id})
        if task is None:
            return None

        return await task.delete()


task_repository = TaskRepository()
