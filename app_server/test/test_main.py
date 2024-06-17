import subprocess
import pytest


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
    assert status == '200'
