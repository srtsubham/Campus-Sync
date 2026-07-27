from fastapi import APIRouter
import os
import boto3

router = APIRouter()

s = boto3.resource("dynamodb")
t = s.Table(os.environ.get("TABLE", "StudentTable"))

@router.post("/student")
def p(d: dict):
    t.put_item(Item=d)
    return d

@router.get("/students")
def g():
    response = t.scan()
    return response.get("Items", [])