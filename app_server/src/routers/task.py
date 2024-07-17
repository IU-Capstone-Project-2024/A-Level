import logging
import aiohttp
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, Form
from fastapi.responses import JSONResponse

from src.storages.mongo.models.task import Task, TaskCreate, TaskUpdate, Topic
from src.storages.mongo.repositories.task import task_repository
from src.storages.mongo.repositories.utils import utils_repository
from src.services.utils import utilsService
from dotenv import load_dotenv
import os

load_dotenv()

MODEL_IPS = os.getenv('MODEL_IPS', '').split(',')

file_handler = logging.FileHandler('task-router.log')
file_handler.setLevel(logging.INFO)  
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)


logging.getLogger('').addHandler(file_handler)

router = APIRouter(prefix="/task", tags=["Task"])


@router.post("/")
async def create(task: TaskCreate):
    return JSONResponse(content=(await task_repository.create(task)).model_dump(), media_type='application/json')

@router.get("/number")
async def read_number(marks: str=None, topic: str=None, year: str=None ):
    response = await task_repository.read_all()
    if marks:
        marks = marks.strip('[]').split(',')
        response = [x for x in response if f'{x.marks}' in marks]
    if topic:
        topic = topic.strip('[]').split(',')
        response = [x for x in response if f'{x.topic}' in topic]
    if year:
        year = year.strip('[]').split(',')
        response = [x for x in response if f'{x.year}' in year]

    return len(response)

@router.get("/{task_id}")
async def read(task_id: PydanticObjectId) -> Task | None:
    task = await task_repository.read(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task {task_id} does not exist")

    return JSONResponse(content=task.model_dump(), media_type='application/json')


@router.get("/")
async def read_all(offset: int=None, length: int=None, marks: str=None, topic: str=None, year: str=None ) -> list[Task]:

    if (offset is None) ^ (length is None):
            raise HTTPException(statuse_code=400, detail="Bad request: must specify either both offset and length or None of them")

    response = await task_repository.read_all()
    if marks:
        marks = marks.strip('[]').split(',')
        response = [x for x in response if f'{x.marks}' in marks]
    if topic:
        topic = topic.strip('[]').split(',')
        response = [x for x in response if f'{x.topic}' in topic]
    if year:
        year = year.strip('[]').split(',')
        response = [x for x in response if f'{x.year}' in year]
        
    result = response if length is None else response[offset * length: (offset + 1) * length] 
    response = [item.model_dump() for item in result]
    return JSONResponse(content=response, media_type='application/json')


@router.patch("/{task_id}")
async def update(task_id: PydanticObjectId, task_update: TaskUpdate) -> Task | None:
    task = await task_repository.read(task_id=task_id)
    if task.year != task_update.year:
        utils_repository.delete_year(task.year)
        utils_repository.update_years(task_update.year)
    
    task = await task_repository.update(task_id, task_update)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task {task_id} does not exist")
        
    return JSONResponse(content=task.model_dump(), media_type='application/json')


@router.delete("/{task_id}")
async def delete(task_id: PydanticObjectId):
    result = await task_repository.read(task_id=task_id)
    await task_repository.delete(task_id)
    return JSONResponse(content=result.model_dump(), media_type='application/json')


@router.get("/{task_id}/predict")
async def predict(task_id: PydanticObjectId):
    task = await task_repository.read(task_id)
    if task is None:
        return HTTPException(status_code=404, detail=f"Task {task_id} does not exists")
    

    availables = await utilsService.fetch_ips(MODEL_IPS)
    for index, model in enumerate(availables):
        if model['is_ready']:
            data = {"request": task.content}
            url = f"http://{MODEL_IPS[index]}/predict"
            async with aiohttp.ClientSession(trust_env=True) as session:
                async with session.post(url, json=data) as response:
                    result = await response.json()

                    task.topic = Topic(result['topic_id'])
                    await task_repository.update(task.id, task)
                    return JSONResponse(content=result, media_type='application/json')
                
                
        
    
    
@router.post("/unsavedPredict")
async def unsaved_predict(content: str = Form(...)):
    data = {"request": content}
    url = f'http://{MODEL_IPS[-1]}/predict'
    async with aiohttp.ClientSession(trust_env=True) as session:
        async with session.post(url, json=data) as response:
            return await response.json()
