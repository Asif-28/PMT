# third prarty
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import countries, project, project_clients, survey


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


app.include_router(project.router)
app.include_router(project_clients.router)
app.include_router(survey.router)
app.include_router(countries.router)


# &name=dgdg&api=436346&country=India&country_code=IN&project_code=436346&scope=1&loi=10&ip=
