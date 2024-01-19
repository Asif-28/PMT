import os
import requests
import re
from dotenv import load_dotenv

load_dotenv()

SOURCE = os.getenv("SOURCE", "http://localhost:8000")


def request_post(endpoint, data, message, status):
    url = endpoint  # replace with your actual server URL
    response = requests.post(url, json=data)
    print(f"\nSTATUS: {response.status_code}")
    print(response.json())
    assert response.status_code == status

    assert re.search(message.lower(), response.json()["detail"].lower())



def request_get(endpoint, status=200):
    url = endpoint  # replace with your actual server URL
    response = requests.get(url)
    print(f"\nSTATUS: {response.status_code}")
    print(response.json())
    assert response.status_code == status

    return response.json()
