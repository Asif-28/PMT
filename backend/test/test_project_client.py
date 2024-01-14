import pytest
import requests
from faker import Faker
import os
from .test_project import data as project_data
import json

fake = Faker()

SOURCE = os.getenv("SOURCE", "http://localhost:8000")
endpoint = f"{SOURCE}/project_clientproject_client"

data = {
  "project_code": project_data["project_code"],
  "input_field": "string",
  "country": "string",
  "country_code": "string",
  "scope": 0,
  "test_link": "string",
  "live_link": "string",
  "check_country": True,
  "check_quota": True,
  "project_id": 0
}

def test_create_project_client():
    url = f"{endpoint}/create"  # replace with your actual server URL
    print(json.dumps(data))
    response = requests.post(url, json=data)
    print(response.text)
    assert response.status_code == 200
    assert "created" in response.json()["message"].lower()
