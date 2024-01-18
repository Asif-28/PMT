import pytest
import requests
from faker import Faker
from .const import SOURCE

fake = Faker()

endpoint = f"{SOURCE}/vendor"

data = {
    "name": fake.name(),
    "email": fake.email(),
}


def test_create_vendor():
    url = f"{endpoint}/create"  # replace with your actual server URL
    response = requests.post(url, json=data)
    print(response.json())
    assert response.status_code == 200
    assert "created" in response.json()["message"].lower()


def test_list_vendor():
    url = f"{endpoint}/list"  # replace with your actual server URL
    response = requests.get(url)
    print(response.json())
    assert response.status_code == 200

    match = False

    for vendor in response.json():
        if vendor["name"] == data["name"]:
            match = True
            break

    assert match == True
