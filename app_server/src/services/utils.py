from src.storages.mongo.repositories.task import task_repository
import random
import aiohttp
import asyncio

MAX_QUESTIONS = 1000
FIRST_COMPONENTS_NUMBER_OF_POINTS = 30
FIRST_COMPONENTS_NUMBER_OF_QUESTIONS = [5,6]
THIRD_COMPONENT_NUMBER_OF_POINTS = 20


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
            return sorted(result, key=lambda x:x.marks) 
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
            if not(section_A and section_B and section_C):
                return None
            section_A_id = [f'{item.id}' for item in section_A]
            section_B_id = [f'{item.id}' for item in section_B]
            section_C_id = f'{section_C.id}'
            response = {
                'sectionA': section_A_id,
                'sectionB': section_B_id,
                'sectionC': section_C_id,
            }
            return response
        except Exception as e:
            with open('create_exam_variant.log', 'a') as logfile:
                logfile.write(f'{e}')
                
    @staticmethod
    async def fetch(session, url):
        async with session.get(url) as response:
            return await response.json()
                
    async def fetch_ips(self, ips):
        async with aiohttp.ClientSession() as session:
            tasks = [UtilsService.fetch(session, f'http://{ip}/status') for ip in ips]
            responses = await asyncio.gather(*tasks)
            return responses
        
        
utilsService = UtilsService()