from pydantic import BaseModel
from typing import Dict, Optional
from beanie import Document


class UtilsCreate(BaseModel):
    years: Optional[Dict[str, int]] = None
    marks: Optional[Dict[str, int]] = None

class UtilsUpdate(BaseModel):
    years: Optional[Dict[str, int]] = None
    marks: Optional[Dict[str, int]] = None

class Utils(UtilsCreate, Document):
    pass




