from src.storages.mongo.models.task import Task
from src.storages.mongo.repositories.task import task_repository
from src.services.document import document_service
from pydantic import BaseModel
from beanie import PydanticObjectId
from typing import Dict
import random

MAX_QUESTIONS = 1000
FIRST_COMPONENTS_NUMBER_OF_POINTS = 30
FIRST_COMPONENTS_NUMBER_OF_QUESTIONS = [5,6]
THIRD_COMPONENT_NUMBER_OF_POINTS = 20

class Extract(BaseModel):
    idx: PydanticObjectId | None = None
    extracts: Dict[str,str] | None = None

class UtilsService:
    
    @staticmethod
    def find_subarray_with_sum(arr, length, target_sum):
        try:
            n = len(arr)
            dp = [[[False] * (length + 1) for _ in range(target_sum + 1)] for _ in range(n + 1)]
            
            dp[0][0][0] = True
            
            for i in range(1, n + 1):
                for j in range(target_sum + 1):
                    for k in range(length + 1):

                        dp[i][j][k] = dp[i - 1][j][k]

                        if j >= arr[i - 1].marks and k > 0:
                            dp[i][j][k] = dp[i][j][k] or dp[i - 1][j - arr[i - 1].marks][k - 1]
            
            if not dp[n][target_sum][length]:
                return None
    
            result = []
            j = target_sum
            k = length
            for i in range(n, 0, -1):
                if dp[i][j][k] and not dp[i - 1][j][k]:
                    result.append(arr[i - 1])
                    j -= arr[i - 1].marks
                    k -= 1
            
            return result[::-1] 
        except Exception as e:
            with open('create_exam_variant.log', 'a') as logfile:
                logfile.write(f'{arr}')


    async def create_exam_variant(self):
        try:
            questions = (await task_repository.read_all())[:MAX_QUESTIONS] #Taking a slice for optimizational purposes
            random.shuffle(questions)
            section_A = UtilsService.find_subarray_with_sum(questions, random.choice(FIRST_COMPONENTS_NUMBER_OF_QUESTIONS), FIRST_COMPONENTS_NUMBER_OF_POINTS)
            used_in_A = [idx.id for idx in section_A]
            section_B = UtilsService.find_subarray_with_sum([question for question in questions if question.id not in used_in_A], random.choice(FIRST_COMPONENTS_NUMBER_OF_QUESTIONS), FIRST_COMPONENTS_NUMBER_OF_POINTS)
            section_C = random.choice([question for question in questions if question.marks == THIRD_COMPONENT_NUMBER_OF_POINTS])
            if not(section_A and section_C):
                return None
            unique_document_ids = list({task.document_id for task in section_A + section_B + [section_C] if task.document_id is not None})
            extracts = []
            for idx in unique_document_ids:
                document = await document_service.read(idx)
                extracts.append(Extract(idx=idx, extracts=document.extracts))
            
            response = {
                'section A': section_A,
                'section B': section_B,
                'section C': section_C,
                'Extracts': extracts
            }
            return response
        except Exception as e:
            with open('create_exam_variant.log', 'a') as logfile:
                logfile.write(f'{e}')
        
        
utilsService = UtilsService()