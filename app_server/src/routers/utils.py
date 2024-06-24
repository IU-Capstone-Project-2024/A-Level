from fastapi import APIRouter
from src.storages.mongo.models.task import Topic
from typing import Dict, List

router = APIRouter(prefix="/utils", tags=["Utils"])

@router.get("/topicEnum")
async def send_enum() -> Dict[str, List]:
    names = [member.name for member in Topic]
    
    for name in names:
        name = " ".join(name.lower().split("_"))
        name[0] = name[0].upper()

    data = {
        "names": names
    }
    
    return data