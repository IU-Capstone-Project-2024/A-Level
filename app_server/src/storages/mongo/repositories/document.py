from beanie import PydanticObjectId
from pymongo.results import DeleteResult
from src.storages.mongo.models.document import Document_, DocumentCreate


class DocumentRepository:
    async def create(self, document: DocumentCreate) -> Document_:
        document = Document_(**document.model_dump())
        return await document.save()

    async def read(self, document_id: PydanticObjectId) -> Document_ | None:
        return await Document_.find_one({"_id": document_id})
    
    async def read_by_path(self, document_path: str) -> Document_ | None:
        return await Document_.find_one({"path": document_path})

    async def read_all(self) -> list[Document_]:
        return await Document_.find().to_list()

    async def delete(self, document_id: PydanticObjectId) -> DeleteResult:
        document = await Document_.find_one({"_id": document_id})
        if document is None:
            return None
    
        return (await document.delete()).raw_result


document_repository = DocumentRepository()
