FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000

COPY ./app_model_l /app_model
RUN pip install --no-cache-dir --upgrade -r /app_model/requirements.txt

WORKDIR /app_model

CMD ["python3", "-m", "src"]