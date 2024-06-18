FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000
COPY ./app_server/requirements.txt /app_server/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app_server/requirements.txt

COPY ./app_server /app_server
WORKDIR /app_server

CMD ["python3", "-m", "src"]
