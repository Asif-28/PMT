import pytest
import requests
from faker import Faker
from .const import SOURCE, request_post, request_get

fake = Faker()

endpoint = f"{SOURCE}/vendor"

data = {
    "name": fake.name(),
    "email": fake.email(),
}


def test_create_vendor():
    request_post(f"{endpoint}/create", data, "created", 200)


def test_list_vendor():
    response = request_get(f"{endpoint}/list")

    match = False

    for vendor in response:
        if vendor["name"] == data["name"]:
            match = True
            break

    assert match == True
