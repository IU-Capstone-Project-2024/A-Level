from src.storages.mongo.models.task import Task
from src.storages.mongo.repositories.task import task_repository
import random

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
            questions = (await task_repository.read_all())[:1000]
            random.shuffle(questions)
            section_A = UtilsService.find_subarray_with_sum(questions, random.choice([5,6]), 30)
            used_in_A = [idx.id for idx in section_A]
            section_B = UtilsService.find_subarray_with_sum([question for question in questions if question.id not in used_in_A], random.choice([5,6]), 30)
            section_C = random.choice([question for question in questions if question.marks == 20])
            if not(section_A and section_C):
                return None
            return {
                'section A': section_A,
                'section B': section_B,
                'section C': section_C
            }
        except Exception as e:
            with open('create_exam_variant.log', 'a') as logfile:
                logfile.write(f'{e}')
        
        
utilsService = UtilsService()