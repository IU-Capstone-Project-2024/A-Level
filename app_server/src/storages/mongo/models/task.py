from enum import IntEnum
from beanie import PydanticObjectId
from beanie import Document
from pydantic import BaseModel


class Topic(IntEnum):
    ENTREPRENEURS_AND_LEADERS = 0
    MANAGING_PEOPLE = 1
    MARKET = 2
    MARKETING_MIX_AND_STRATEGY = 3
    MEETING_CUSTOMER_NEED = 4


class TaskCreate(BaseModel):
    content: str
    topic: Topic | None = None
    verified: bool | None = None
    marks: int | None = None
    year: int | None = None
    document_id: PydanticObjectId | None = None
    page: int | None = None


class TaskUpdate(BaseModel):
    content: str | None = None
    topic: Topic | None = None
    verified: bool | None = None
    marks: int | None = None
    year: int | None = None
    document_id: PydanticObjectId | None = None
    page: int | None = None


class Task(TaskCreate, Document):
    ...
