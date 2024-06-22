from beanie import Document, PydanticObjectId
from pydantic import BaseModel


class DocumentCreate(BaseModel):
    path: str
    filename: str | None = None
    tasks: list[PydanticObjectId] | None = None
    img: str | None = None

class DocumentUpdate(BaseModel):
    path: str
    filename: str | None = None
    tasks: list[PydanticObjectId] | None = None
    img: str | None = None


class Document_(DocumentCreate, Document):
    _id: PydanticObjectId

    class Settings:
        name = "Document"
