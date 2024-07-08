import subprocess
import pytest
import regex
import ast
from src.storages.mongo.models.task import Topic


def extract_dict_from_text(text):
    dict_pattern = regex.compile(r'\{(?:[^{}]|(?R))*\}', regex.DOTALL)

    match = dict_pattern.search(text)
    if match:
        dict_str = match.group()
        dict_str = dict_str.replace('null', 'None')
        dict_str = dict_str.replace('true', 'True')
        dict_str = dict_str.replace('false', 'False')
        # print(dict_str)
        try:
            dictionary = ast.literal_eval(dict_str)
            return dictionary
        except (SyntaxError, ValueError) as e:
            print(f"Error evaluating the dictionary: {e}")
    else:
        print("No dictionary found in the text.")
    return None

def extract_list_from_text(text):
    list_pattern = regex.compile(r"\[.*\]", regex.DOTALL)

    match = list_pattern.search(text)
    if match:
        list_str = match.group(0)
        list_str = list_str.replace('null', 'None')
        list_str = list_str.replace('true', 'True')
        list_str = list_str.replace('false', 'False')
        try:
            lst = ast.literal_eval(list_str)
            return lst
        except (SyntaxError, ValueError) as e:
            print(f"Error evaluating the dictionary: {e}")


def test_upload_file():
    
    command = 'curl -X POST -F "uploaded_file=@/$(pwd)/test/files/test1.pdf" http://0.0.0.0:8000/document/upload -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    # print(result.stdout)
    response = extract_dict_from_text(result.stdout)
    # print(response)
    assert status == '200'
    assert len(response['tasks']) == 13
    # print('hi')


def test_get_all():

    command = 'curl -X GET http://localhost:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_list_from_text(result.stdout)
    # print(response[0]['_id'])
    assert status == '200'


def test_get_number_of_docs():
    command = 'curl -X GET http://0.0.0.0:8000/document/number -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    assert status == '200'

    number_of_docs = result_text[-1].strip()

    command = 'curl -X GET http://0.0.0.0:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    assert status == '200'

    assert number_of_docs == f'{len(extract_list_from_text(result.stdout))}'


def test_get_one_document():
    command = 'curl -X GET http://localhost:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    assert status == '200'
    response = extract_list_from_text(result.stdout)

    chosen_id = response[0]['_id']
    command = f'curl -X GET http://localhost:8000/document/{chosen_id} -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    status = result_text[0].split(' ')[1]
    assert status == '200'
    chosen_response = extract_dict_from_text(result.stdout)

    for key, value in chosen_response.items():
        assert response[0][key] == value





def test_remove_document():

    command = 'curl -X GET http://localhost:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_list_from_text(result.stdout)
    assert status == '200'

    if len(response) > 0:
        command = f'curl -X DELETE http://localhost:8000/document/{response[0]['_id']} -i'

        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        result_text = result.stdout.split('\n')
        status = result_text[0].split(' ')[1]

        assert status == '200'

        response_dct = extract_dict_from_text(result.stdout)

        assert response_dct['n'] == 1
        assert response_dct['ok'] == 1.0

def test_topicEnum():
    command = 'curl -X GET http://localhost:8000/utils/topicEnum -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_dict_from_text(result.stdout)
    assert status == '200'
    if response is None or response == {} or response['names'] is None or len(response['names']) == 0:
        assert all(member.value == 0 for member in Topic)
    else:
        for member in Topic:
            assert member.name == response['names'][member.value]


def test_create_question():
    command = 'curl -X POST http://localhost:8000/task/ -H "Content-Type: application/json" -d \'{"content": "Example Question", "topic": 3, "verified": true, "marks": 2, "year": 2020, "document_id": "6681d136ea5be21a7f199c08", "page": 3}\' -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_dict_from_text(result.stdout)
    assert status == '200'
    assert response['content'] == 'Example Question'
    assert response['topic'] == 3
    assert response['verified'] 
    assert response['marks'] == 2
    assert response['year'] == 2020
    assert response['document_id'] == "6681d136ea5be21a7f199c08"
    assert response['page'] == 3


def test_get_tasks():
    command = 'curl -X GET http://localhost:8000/task/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_list_from_text(result.stdout)
    assert status == '200'
    props_list = ['_id', 'content', 'topic', 'verified', 'marks', 'year', 'document_id', 'page']
    if len(response) > 0:
        for dct in response:
            for index, key in enumerate(dct.keys()):
                assert key == props_list[index]


def test_get_tasks_with_filters():

    command = 'curl -X POST -F "uploaded_file=@/$(pwd)/test/files/test1.pdf" http://0.0.0.0:8000/document/upload -i'
    subprocess.run(command, shell=True, capture_output=True, text=True)

    command = 'curl -X GET "http://localhost:8000/task/?marks=2,4,6&year=2019" -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_list_from_text(result.stdout)
    assert status == '200'
    if len(response) > 0:
        for dct in response:
            assert dct['marks'] in [2,4,6]
            assert dct['year'] == 2019
            
            
def test_get_task_number():
    command = 'curl -X POST -F "uploaded_file=@/$(pwd)/test/files/test1.pdf" http://0.0.0.0:8000/document/upload -i'
    subprocess.run(command, shell=True, capture_output=True, text=True)

    command = 'curl -X GET "http://localhost:8000/task/?marks=2,4,6&year=2019" -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    task_response = extract_list_from_text(result.stdout)
    assert status == '200'
    
    command = 'curl -X GET "http://localhost:8000/task/number?marks=2,4,6&year=2019" -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    length_response = result_text[-1]
    assert status == '200'
    
    assert f'{len(task_response)}' == length_response
    

def test_get_task_by_id():
    command = 'curl -X POST http://localhost:8000/task/ -H "Content-Type: application/json" -d \'{"content": "Example Question", "topic": 3, "verified": true, "marks": 2, "year": 2020, "document_id": "6681d136ea5be21a7f199c08", "page": 3}\' -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    post_response = extract_dict_from_text(result.stdout)

    command = f'curl -X GET http://localhost:8000/task/{post_response['_id']}  -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    get_response = extract_dict_from_text(result.stdout)
    assert status == '200'
    for key, value in post_response.items():
        assert value == get_response[key]
    
    
def test_patch_question():
    command = 'curl -X POST http://localhost:8000/task/ -H "Content-Type: application/json" -d \'{"content": "Example Question", "topic": 3, "verified": true, "marks": 2, "year": 2020, "document_id": "6681d136ea5be21a7f199c08", "page": 3}\' -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    post_response = extract_dict_from_text(result.stdout)

    data = '-H "Content-Type: application/json" -d \'{"content": "Updated Question", "topic": 2, "verified": false, "marks": 12, "year": 2021, "document_id": "6681d136ea5be21a7f199c08", "page": 3}\''
    command = f'curl -X PATCH http://localhost:8000/task/{post_response['_id']} {data} -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    patch_response = extract_dict_from_text(result.stdout)
    assert status == '200'
    assert patch_response['content'] == 'Updated Question'
    assert patch_response['topic'] == 2
    assert not patch_response['verified'] 
    assert patch_response['marks'] == 12
    assert patch_response['year'] == 2021
    assert patch_response['document_id'] == "6681d136ea5be21a7f199c08"
    assert patch_response['page'] == 3
    
def test_delete_task():
    command = 'curl -X POST http://localhost:8000/task/ -H "Content-Type: application/json" -d \'{"content": "Example Question", "topic": 3, "verified": true, "marks": 2, "year": 2020, "document_id": null, "page": 3}\' -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    post_response = extract_dict_from_text(result.stdout)

    command = f'curl -X DELETE http://localhost:8000/task/{post_response['_id']}  -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    delete_response = extract_dict_from_text(result.stdout)
    assert status == '200'
    for key, value in post_response.items():
        assert value == delete_response[key]
    
    
    command = f'curl -X GET http://localhost:8000/task/{post_response['_id']}  -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    get_response = extract_dict_from_text(result.stdout)
    assert status == '404'
    assert get_response['detail'] == f"Task {post_response['_id']} does not exist"
    
def test_predict_topic():
    command = 'curl -X POST http://localhost:8000/task/ -H "Content-Type: application/json" -d \'{"content": "Define the term brand", "topic": null, "verified": false, "marks": 2, "year": 2020, "document_id": null, "page": 3}\' -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    post_response = extract_dict_from_text(result.stdout)
    print(f'{post_response}\n------\n')
    
    command = f'curl -X GET http://localhost:8000/task/{post_response['_id']}/predict -i'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    result_text = result.stdout.split('\n')
    print(result_text)
    status = result_text[0].split(' ')[1]
    get_response = extract_dict_from_text(result.stdout)
    
    members = [member.name for member in Topic]
    assert status == '200'
    assert get_response['topic'].upper() in members
    assert 0 <= get_response['topic_id'] < len(members)