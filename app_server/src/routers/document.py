from beanie import PydanticObjectId
from beanie.exceptions import CollectionWasNotInitialized
from fastapi import APIRouter, HTTPException, UploadFile, Form
import logging

from src.storages.mongo.models.document import Document_
from src.services.document import document_service
from src.storages.mongo.repositories.utils import utils_repository
from src.storages.mongo.models.utils import Utils, UtilsCreate, UtilsUpdate

router = APIRouter(prefix="/document", tags=["Document"])

file_handler = logging.FileHandler('document-router.log')
file_handler.setLevel(logging.INFO)  
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)


logging.getLogger('').addHandler(file_handler)


@router.get("/utils")
async def check():
    return await utils_repository.create_instance(UtilsCreate(years={}, marks={}))


@router.post("/upload")
async def upload(uploaded_file: UploadFile) -> Document_:
    try:
        inst = await utils_repository.read_instance()
        if inst is None:
            await utils_repository.create_instance(UtilsCreate(years={}, marks={}))
        result = await document_service.create(uploaded_file.filename, uploaded_file.file.read())
    except Exception as e:
        print(f"Exception: {e}")
        with open('utils-log.log', 'w') as myfile:
            myfile.write(type(e))    

            myfile.write(e.args)     

            myfile.write(e) 
    return result

#GET 0.0.0.0:8000/document

@router.get("/number")
async def get_number_of_docs():
    return len(await document_service.read_all())


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
async def upload_img(document_id: PydanticObjectId, img: str = Form(...)) -> Document_:

    try:
        document_update = await document_service.read(document_id)
        document_update.img = img
        document = await document_service.update(document_id, document_update)
        return document
    except Exception as e:
        return None
    