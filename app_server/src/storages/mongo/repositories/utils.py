from src.storages.mongo.models.utils import Utils, UtilsCreate, UtilsUpdate
from typing import Optional


class UtilsRepository:
    async def create_instance(self, data: UtilsCreate) -> Utils:
        instance = Utils(**data.model_dump())
        # print(instance)
        await instance.save()
        return instance
    
    async def read_instance(self) -> Optional[Utils]:
        return await Utils.find_one({})

    async def update_years(self, key: str) -> None:
        instance = await Utils.find_one({})
        if instance:
            if not instance.years:
                instance.years = {}
            if key not in instance.years or instance.years[key] is None:
                instance.years[key] = 1
            else:
                instance.years[key] += 1
            await instance.save()

    async def update_marks(self, key: str) -> None:
        instance = await Utils.find_one({})
        if instance:
            if not instance.marks:
                instance.marks = {}
            if key not in instance.marks or instance.marks[key] is None:
                instance.marks[key] = 1
            else:
                instance.marks[key] += 1
            await instance.save()

    async def delete_mark(self, key: str) -> None:
        instance = await Utils.find_one({})
        if instance and instance.marks:
            if key in instance.marks:
                if instance.marks[key] > 1:
                    instance.marks[key] -= 1
                else:
                    del instance.marks[key]
            await instance.save()

    async def delete_year(self, key: str) -> None:
        instance = await Utils.find_one({})
        if instance and instance.years:
            if key in instance.years:
                if instance.years[key] > 1:
                    instance.years[key] -= 1
                else:
                    del instance.years[key]
            await instance.save()

utils_repository = UtilsRepository()
