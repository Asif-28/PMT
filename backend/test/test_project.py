import pytest
import requests
from faker import Faker
from .const import SOURCE, request_post, request_get
from .test_client import data as client_data

fake = Faker()

endpoint = f"{SOURCE}/project"

data = [
    {
        "data": {
            "project_name": "string",
            "project_code": f"PKD-{fake.random_int(min=1000, max=9999)}",
            "project_manager": "string",
            "client_project_manager": "string",
            "incidence_rate": "string",
            "loi": "string",
            "target": "HCP",
            "target_description": "string",
            "status": "string",
            "online": "string",
            "methodology": "string",
            "billing_comments": fake.text(),
            "security_check": fake.boolean(),
            "client_name": client_data["name"],
        },
        "message": "created",
        "status": 200,
    },
    {
        "data": {
            "project_name": "string",
            "project_code": f"string",
            "project_manager": "string",
            "client_project_manager": "string",
            "incidence_rate": "string",
            "loi": "string",
            "target": "HCP",
            "target_description": "string",
            "status": "string",
            "online": "string",
            "methodology": "string",
            "billing_comments": fake.text(),
            "security_check": fake.boolean(),
            "client_name": client_data["name"],
        },
        "message": "UNIQUE|Duplicate",
        "status": 400,
    },
]


def create_project(data, message, status):
    request_post(f"{endpoint}/create", data, message, status)


def list_project(data):
    response = request_get(f"{endpoint}/list")

    match = False

    # check if data is valid
    for project in response:
        if project["project_name"] == data["project_name"]:
            if project["project_code"] == data["project_code"]:
                match = True
                break

    assert match == True


def test_model_project():
    for d in data:
        create_project(d["data"], d["message"], d["status"])
        if d["status"] == 200:
            list_project(d["data"])
