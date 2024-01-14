import pytest
import requests
from faker import Faker
fake = Faker()

endpoint = "http://localhost:8000/client"

data = {
  "client_name": fake.name(),
  "client_email": fake.email(),
  "client_project_manager": fake.name(),
}

def test_create_client():
    url = f"{endpoint}/create"  # replace with your actual server URL
    response = requests.post(url, json=data)
    print(response.json())
    assert response.status_code == 200
    assert response.json()["message"] == "Client created successfully"

def test_list_client():
    url = f"{endpoint}/list"  # replace with your actual server URL
    response = requests.get(url)
    assert response.status_code == 200
    assert len(response.json()) > 0

    # check if data is valid
    for client in response.json():
        assert client["name"]
        assert client["email"]
        # add other required fields here