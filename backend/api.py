# third prarty
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import client, countries, project, survey


app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(client.router)
app.include_router(countries.router)
app.include_router(project.router)
app.include_router(survey.router)


# &name=dgdg&api=436346&country=India&country_code=IN&project_code=436346&scope=1&loi=10&ip=
