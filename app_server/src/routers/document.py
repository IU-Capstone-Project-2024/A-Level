from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, Form
import logging

from src.storages.mongo.models.document import Document_
from src.services.document import document_service

router = APIRouter(prefix="/document", tags=["Document"])

file_handler = logging.FileHandler('document-router.log')
file_handler.setLevel(logging.INFO)  
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)


logging.getLogger('').addHandler(file_handler)


@router.post("/upload")
async def upload(uploaded_file: UploadFile) -> Document_:
    return await document_service.create(uploaded_file.filename, uploaded_file.file.read())


@router.get("/")
async def read_all(offset: int=None, length: int=None) -> list[Document_]:
    try:
        if (offset is None) ^ (length is None):
            raise HTTPException(statuse_code=400, detail="Bad request: must specify either both offset and length or None of them")
        else:
            response = await document_service.read_all ()
            return response if length is None else response[offset * length: (offset + 1) * length] 
    except Exception as e:
        logging.error(f"The following exception occured {e}\n {response}")



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


@router.post("/{document_id}/img")
async def upload_img(document_id: PydanticObjectId, img: str = Form(...)):
    return img