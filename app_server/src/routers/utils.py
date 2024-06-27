from fastapi import APIRouter
from src.storages.mongo.models.task import Topic
from typing import Dict, List

router = APIRouter(prefix="/utils", tags=["Utils"])

@router.get("/topicEnum")
async def send_enum() -> Dict[str, List]:
    names = [member.name for member in Topic]
    values = [member.value for member in Topic]

    data = {
        "names": names,
        "values": values
    }
    
    return data