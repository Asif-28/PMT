import pytest
import requests
from faker import Faker
from .const import SOURCE

fake = Faker()

endpoint = f"{SOURCE}/project"

data = {
    "project_name": "string",
    "project_code": f"PKD-{fake.random_int(min=1000, max=9999)}",
    "project_manager": "string",
    "client_project_manager": "string",
    "incidence_rate": "string",
    "loi": "string",
    "scope": 0,
    "target": "HCP",
    "target_description": "string",
    "selected_project_status": "string",
    "online": "string",
    "selected_div": "string",
    "billing_comments": fake.text(),
    "security_check": fake.boolean(),
}


def test_create_project():
    url = f"{endpoint}/create"  # replace with your actual server URL
    response = requests.post(url, json=data)
    print(response.json())
    assert response.status_code == 200
    assert "created" in response.json()["message"].lower()


def test_list_project():
    url = f"{endpoint}/list"  # replace with your actual server URL
    response = requests.get(url)
    assert response.status_code == 200
    assert len(response.json()) > 0

    match = False

    # check if data is valid
    for project in response.json():
        if project["project_name"] == data["project_name"]:
            if project["project_code"] == data["project_code"]:
                match = True
                break

    assert match == True
