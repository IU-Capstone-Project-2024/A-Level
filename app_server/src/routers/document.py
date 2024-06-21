from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile

from src.storages.mongo.models.document import Document_
from src.services.document import document_service

router = APIRouter(prefix="/document", tags=["Document"])


@router.post("/upload")
async def upload(uploaded_file: UploadFile) -> Document_:
    return await document_service.create(uploaded_file.filename, uploaded_file.file.read())


@router.get("/")
async def read_all() -> list[Document_]:
    return await document_service.read_all()



@router.get("/{document_id}")
async def read(document_id: PydanticObjectId) -> Document_ | None:
    try:
        return await document_service.read(document_id)
    except ValueError:
        raise HTTPException(status_code=404, detail=f"Document {document_id} does not exist")


@router.delete("/{document_id}")
async def delete(document_id: PydanticObjectId):
    try:
        return await document_service.delete(document_id)
    except ValueError:
        raise HTTPException(status_code=404, detail=f"Document {document_id} does not exist")
