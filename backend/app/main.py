from fastapi import FastAPI
from mangum import Mangum
from app.api.routes import f

app = FastAPI()

app.include_router(f)

handler = Mangum(app)