import pytest
import requests
from faker import Faker
from .test_project import data as project_data
import json
from .const import SOURCE

fake = Faker()


endpoint = f"{SOURCE}/project_client"

data = {
  "project_code": project_data["project_code"],
  "input_field": "string",
  "country": fake.country(),
  "country_code": fake.country_code(),
  "scope": 0,
  "test_link": "string",
  "live_link": "string",
  "check_country": True,
  "check_quota": True,
}

def test_create_project_client():
    url = f"{endpoint}/create"  # replace with your actual server URL
    print(json.dumps(data))
    response = requests.post(url, json=data)
    print(response.json())
    assert response.status_code == 200
    assert "created" in response.json()["message"].lower()

def test_list_project_client():
    url = f"{endpoint}/list"  # replace with your actual server URL
    response = requests.get(url)
    print(response.json())
    assert response.status_code == 200

    match = False

    for project_client in response.json():
        if project_client["project_code"] == data["project_code"]:
            match = True
            break    

    assert match == True
