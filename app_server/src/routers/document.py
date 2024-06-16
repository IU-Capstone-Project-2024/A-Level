from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile

from src.storages.mongo.models.document import Document_
from src.services.document import document_service

router = APIRouter(prefix="/document", tags=["Document"])


@router.post("/upload")
async def upload(uploaded_file: UploadFile) -> Document_:
    print(uploaded_file.file)
    return await document_service.create(uploaded_file.filename, uploaded_file.file.read())


@router.get("/")
async def read_all() -> list[Document_]:
    return await document_service.read_all()


