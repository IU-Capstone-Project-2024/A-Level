FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000

COPY ./app_model_h/requirements.txt /app_model/requirements.txt
RUN pip install -r /app_model/requirements.txt

COPY ./../efficient_kan/kan.py /app_model/src/
COPY ./app_model_h /app_model

WORKDIR /app_model

CMD ["python3", "-m", "src"]