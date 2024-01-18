import pytest
import requests
from faker import Faker
from .const import SOURCE, request_post, request_get

fake = Faker()

endpoint = f"{SOURCE}/client"

data = {
    "client_name": fake.name(),
    "client_email": fake.email(),
    "client_project_manager": fake.name(),
}


def test_create_client():
    request_post(f"{endpoint}/create", data, "created", 200)


def test_list_client():
    response = request_get(f"{endpoint}/list")

    match = False

    # check if data is valid
    for client in response:
        if client["client_name"] == data["client_name"]:
            if client["client_email"] == data["client_email"]:
                match = True
                break

    assert match == True


# st run --checks all http://localhost:8000/openapi.json
