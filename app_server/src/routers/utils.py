from fastapi import APIRouter
from fastapi.responses import JSONResponse
from src.storages.mongo.models.task import Topic
from typing import Dict, List, Optional
from src.storages.mongo.repositories.utils import utils_repository
from src.storages.mongo.models.utils import Utils
from src.services.utils import utilsService
from pydantic import BaseModel

router = APIRouter(prefix="/utils", tags=["Utils"])

class TopicEnum(BaseModel):
    names: list[str] | None = None

@router.get("/topicEnum")
async def send_enum() -> Dict[str, List]:
    names = [member.name for member in Topic]
    
    data = TopicEnum(names=names)
    return JSONResponse(content=data.model_dump(), media_type='application/json')

@router.get("/")
async def send_marks() -> Optional[Utils]:
    return JSONResponse(content=(await utils_repository.read_instance()).model_dump(), media_type='application/json')

@router.get("/all")
async def send() -> Optional[List]:
    result = await utils_repository.read_all()
    response = [item.model_dump() for item in result]
    return JSONResponse(content=response, media_type='application/json')

@router.get("/exam")
async def create_exam_variant():
    try:
        response = (await utilsService.create_exam_variant()).model_dump()
        return JSONResponse(content=response, media_type='application/json')
    except Exception as e:
        with open('utils.log', 'a') as logfile:
            logfile.write(f'{e}')

