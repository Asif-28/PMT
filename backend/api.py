# third prarty
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymongo

# locals
from models import Project, Client, GetSurvey, PostSurvey
from database import db_projects, db_clients
from constants import message, JSONResponse
from _country_codes import countries
from views import check_ip

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

"""
Project
"""


@app.post("/project/create")
async def create_project(project: Project) -> JSONResponse:
    """
    Create a new project
    """

    db_projects.create_index(project.index_key(), unique=True)

    try:
        db_projects.insert_one(project.model_dump())
        return message.success(text="Project created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text=f"Project {project.ProjectName} already exists.")


@app.get("/project/list")
async def list_projects() -> list[Project]:
    """
    List all projects
    """

    projects = db_projects.find()
    return [Project(**project) for project in projects]


"""
Client
"""


@app.post("/client/create")
async def create_client(client: Client) -> JSONResponse:
    """
    Create a new client
    """

    db_clients.create_index(client.index_key(), unique=True)

    try:
        db_clients.insert_one(client.model_dump())
        return message.success(text="Client created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text="Client already exists")


@app.get("/client/list")
async def list_clients() -> list[Client]:
    """
    List all clients
    """

    clients = db_clients.find()
    print(clients)
    return [Client(**client) for client in clients]


"""
Countries Code details
"""


@app.get("/countries_code/get")
async def get_countries_code():
    """
    list of names of all countries with their 2 letter code
    """
    return countries


"""
Survey get
"""


@app.get("/survey/get")
def get_survey(survey: GetSurvey):
    """
    Get survey details
    """
    # Survey
    # Check if project exists
    try:
        project = Project(**db_projects.find_one({"ProjectCode": survey.ProjectCode}))
        client = Client(**db_clients.find_one({"ProjectCode": survey.ProjectCode}))
    except Exception as e:
        return message.error(text=f"{e}")

    # Check if country exists
    if survey.CountryCode not in countries:
        return message.error(text="Country does not exist")

    # validate Ip
    data = check_ip(survey.Ip)
    if not isinstance(data, dict):
        return message.error(text="Invalid Ip")

    # Check if client exists
    data = PostSurvey(
        Ip=survey.Ip,
        Country=data["Country"],
        CountryCode=survey.CountryCode,
        ProjectCode=survey.ProjectCode,
        Loi=None,
        TransId=None,
        VendorId=None,
        VendorCode=None,
        Status=None,
        StartTime=None,  # Epoch time
        EndTime=None,  # Epoch time
        FraudScore=None,
    )


# &name=dgdg&api=436346&country=India&country_code=IN&project_code=436346&scope=1&loi=10&ip=
