import joblib
from typing import Annotated
from fastapi import FastAPI, Body
from pydantic import BaseModel
from json import loads
import logging

app = FastAPI()
model = joblib.load("weights/naive_bayes.joblib")
encodings = loads(open("weights/naive_bayes_encodings.json", "r").read())


class PredictionRequest(BaseModel):
    request: str


@app.post("/predict", tags=["Predict"])
def predict(request: Annotated[PredictionRequest, Body()]):
    logging.info(f"Received request: {request.request}")

    topic_id = int(model.predict([request.request])[0])
    return {
        "topic": encodings[str(topic_id)],
        "topic_id": topic_id
    }
