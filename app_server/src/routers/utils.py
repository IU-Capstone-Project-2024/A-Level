from fastapi import APIRouter,Response
from src.storages.mongo.models.task import Topic
from typing import Dict, List, Optional
from src.storages.mongo.repositories.utils import utils_repository
from src.storages.mongo.repositories.task import task_repository
from src.storages.mongo.models.utils import Utils, UtilsCreate, UtilsUpdate
from src.services.utils import utilsService

router = APIRouter(prefix="/utils", tags=["Utils"])

@router.get("/topicEnum")
async def send_enum() -> Dict[str, List]:
    names = [member.name for member in Topic]
    
    data = {
        "names": names
    }
    
    return data

@router.get("/")
async def send_marks() -> Optional[Utils]:
    return await utils_repository.read_instance()

@router.get("/all")
async def send() -> Optional[List]:
    return await utils_repository.read_all()

@router.post("/exam")
async def create_exam_variant():
    try:
        response = await utilsService.create_exam_variant()
        return response
    except Exception as e:
        with open('utils.log', 'a') as logfile:
            logfile.write(f'{e}')

