from typing import Annotated
from fastapi import FastAPI, Body
from pydantic import BaseModel
from json import loads
import logging
from src.model import Model
import torch

MODEL_ALIAS = 'model_h'

app = FastAPI()

model = Model()
model.load_state_dict(torch.load('weights/roberta_kan_weights.pth', map_location=torch.device('cpu')))
model.eval()
model.requires_grad_(False)
model_ready = 0

encodings = loads(open("weights/roberta_kan_encodings.json", "r").read())


class PredictionRequest(BaseModel):
    request: str


@app.get("/status", tags=["Status"])
def predict():
    logging.info(f"Received request: check for status")
    return {
        'load': model_ready,
        'is_ready': model_ready < 5,
        'model_alias': MODEL_ALIAS
    }


@app.post("/predict", tags=["Predict"])
def predict(request: Annotated[PredictionRequest, Body()]):
    global model_ready
    logging.info(f"Received request: {request.request}")

    model_ready += 1
    res = torch.softmax(model(request.request), dim=1).view(-1)
    probabilities, topic_id = list(map(float, res.numpy())), torch.argmax(res).item()
    print(probabilities, res.numpy())
    model_ready -= 1

    return {
        "topic": encodings[str(topic_id)],
        "topic_id": topic_id,
        "probabilities": probabilities,
        'class_mapping': encodings,
        'model_alias': MODEL_ALIAS
    }
