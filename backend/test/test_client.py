import pytest
from .const import SOURCE, request_post, request_get, fake

endpoint = f"{SOURCE}/client"

data = {
    "name": fake.name(),
    "email": fake.email(),
    "project_manager": fake.name(),
}


def test_create_client(data):
    request_post(f"{endpoint}/create", data, "created", 200)


def test_list_client(data):
    response = request_get(f"{endpoint}/list")

    match = False

    # check if data is valid
    for client in response:
        if client["name"] == data["name"]:
            if client["email"] == data["email"]:
                match = True
                break

    assert match == True


# st run --checks all http://localhost:8000/openapi.json
