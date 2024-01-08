from pydantic import BaseModel

class Client(BaseModel):
    ClientName: str
    ClientEmail: str
    ClientProjectManager: str
