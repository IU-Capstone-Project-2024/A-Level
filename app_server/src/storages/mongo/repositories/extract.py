from beanie import PydanticObjectId
from pymongo.results import DeleteResult
from src.storages.mongo.models.document import Document_, Extract, ExtractCreate

class ExtractRepository:
    async def create(self, extract: ExtractCreate) -> Extract:
        extract = Extract(**extract.model_dump())
        return await extract.save()
    
    async def read(self, document_id: PydanticObjectId) -> list[Extract]:
        return await Extract.find({"document_id": document_id}).to_list()
    
    async def read_all(self) -> list[Extract]:
        return await Extract.find().to_list()
    
    async def delete(self, document_id: PydanticObjectId) -> list[Extract]:
        extracts = await Extract.find({"document_id": document_id}).to_list()
        if extracts is None or extracts == []:
            return []
        for extract in extracts:
            await extract.delete()
        return extracts
    
extract_repository = ExtractRepository()