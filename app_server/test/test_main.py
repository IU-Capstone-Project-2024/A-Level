import subprocess
import pytest
import re
import ast
from src.storages.mongo.models.task import Topic


def extract_dict_from_text(text):
    dict_pattern = re.compile(r"\{.*?\}", re.DOTALL)

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
    list_pattern = re.compile(r"\[.*\]", re.DOTALL)

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
    assert status == '200'
    assert len(response['tasks']) == 13
    # print('hi')


def test_get_all():

    command = 'curl -X GET http://localhost:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_list_from_text(result.stdout)
    print(response[0]['_id'])
    assert status == '200'

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


    
        
