import pytest
import requests
from faker import Faker
from .test_project import data as project_data
import json
from .const import SOURCE, request_post, request_get

fake = Faker()


endpoint = f"{SOURCE}/project_client"

data = {
    "project_code": project_data[0]["data"]["project_code"],
    "input_field": "string",
    "country": fake.country(),
    "country_code": fake.country_code(),
    "scope": 100,
    "test_link": "string",
    "live_link": "string",
    "check_country": True,
    "check_quota": True,
}


def test_create_project_client():
    request_post(f"{endpoint}/create", data, "created", 200)


def test_list_project_client():
    response = request_get(f"{endpoint}/list")

    match = False

    for project_client in response:
        if project_client["project_code"] == data["project_code"]:
            match = True
            break

    assert match == True
