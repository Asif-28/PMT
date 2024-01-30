import pytest
from .const import request_post, request_get, SOURCE, fake
from .test_vendor import data as vendor_data
from .test_project_client import data as project_client_data

endpoint = f"{SOURCE}/project_vendor"

data = {
    "project_code": project_client_data["project_code"],
    "vendor_code": f"PTM_{fake.random_int(min=1000, max=9999)}",
    "scope": 0,
    "complete": "string",
    "terminate": "string",
    "over_quota": "string",
    "pause_vendor": False,
    "vendor_name": vendor_data["name"],
}

def test_create_project_vendor():
    request_post(f"{endpoint}/create", data, "created", 200)

def test_list_project_vendor():
    response = request_get(f"{endpoint}/list")

    match = False

    for project_vendor in response:
        if project_vendor["project_code"] == data["project_code"]:
            match = True
            break

    assert match == True

