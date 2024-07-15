from beanie import Document, PydanticObjectId
from pydantic import BaseModel
from typing import Dict


class DocumentCreate(BaseModel):
    path: str
    filename: str | None = None
    tasks: list[PydanticObjectId] | None = None
    img: str | None = None

class DocumentList(BaseModel):
    documents: list | None = None

class DocumentUpdate(BaseModel):
    path: str
    filename: str | None = None
    tasks: list[PydanticObjectId] | None = None
    img: str | None = None
    
class ExtractCreate(BaseModel):
    
    document_id: PydanticObjectId | None = None
    literal: str | None = None
    content: str | None = None
    
class Extract(ExtractCreate, Document):
    ...
    

class Document_(DocumentCreate, Document):
    _id: PydanticObjectId

    class Settings:
        name = "Document"
