import pytest
import requests

def test_create_client():
    url = "http://localhost:8000/create"  # replace with your actual server URL
    data = {
        "name": "Test Client",
        "email": "test@example.com",
        # add other required fields here
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200
    assert response.json()["message"] == "Client created successfully"
    