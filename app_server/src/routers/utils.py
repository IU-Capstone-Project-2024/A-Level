from fastapi import APIRouter
from src.storages.mongo.models.task import Topic
from typing import Dict, List

router = APIRouter(prefix="/utils", tags=["Utils"])

@router.get("/topicEnum")
async def send_enum() -> Dict[str, List]:
    names = [member.name for member in Topic]
    
    data = {
        "names": names
    }
    
    return data

@router.get("/marks")
async def send_marks() -> list[int]:
    a = [i for i in range(1,21)]
    return a

@router.get("years")
async def send_years() -> list[int]:
    a = [i for i in range(2018, 2024)]
    return a
