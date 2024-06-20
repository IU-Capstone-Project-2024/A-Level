import subprocess
import pytest
import re
import ast

def extract_dict_from_text(text):
    dict_pattern = re.compile(r"\{.*?\}", re.DOTALL)

    match = dict_pattern.search(text)
    if match:
        dict_str = match.group()
        try:
            dictionary = ast.literal_eval(dict_str)
            return dictionary
        except (SyntaxError, ValueError) as e:
            print(f"Error evaluating the dictionary: {e}")
    else:
        print("No dictionary found in the text.")
    return None

def test_get_all():

    command = 'curl -X GET http://localhost:8000/document/ -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    assert status == '200'


def test_upload_file():
    
    command = 'curl -X POST -F "uploaded_file=@/$(pwd)/test/files/test1.pdf" http://0.0.0.0:8000/document/upload -i'

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    

    result_text = result.stdout.split('\n')
    status = result_text[0].split(' ')[1]
    response = extract_dict_from_text(result.stdout)
    assert status == '200'
    assert len(response['tasks']) == 13
