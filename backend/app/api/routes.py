from fastapi import APIRouter
from app.models.schemas import A
from app.services.db import d, e

f = APIRouter()

@f.post("/student")
def g(x: A):
    y = x.model_dump()
    return d(y)

@f.get("/student/{z}")
def h(z: str):
    return e(z)