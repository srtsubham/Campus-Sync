from pydantic import BaseModel

class A(BaseModel):
    id: str
    name: str
    email: str
    course: str