import boto3
import os

a = boto3.resource("dynamodb")
b = os.environ.get("TABLE", "students")
c = a.Table(b)

def d(x):
    c.put_item(Item=x)
    return x

def e(x):
    y = c.get_item(Key={"id": x})
    return y.get("Item")