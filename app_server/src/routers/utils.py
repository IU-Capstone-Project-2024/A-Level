from fastapi import APIRouter
from src.storages.mongo.models.task import Topic
from typing import Dict, List, Optional
from src.storages.mongo.repositories.utils import utils_repository
from src.storages.mongo.models.utils import Utils, UtilsCreate, UtilsUpdate

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
    


