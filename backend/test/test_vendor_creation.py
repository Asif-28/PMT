import pytest
from .const import request_post, request_get, SOURCE
from .test_vendor import data as vendor_data
from .test_project_client import data as project_client_data

endpoint = f"{SOURCE}/project_vendor/create"

data = {
    "project_code": project_client_data[0]["data"]["project_code"],
    "vendor_code": vendor_data[0]["data"]["vendor_code"],
    "scope": 0,
    "complete": "string",
    "terminate": "string",
    "over_quota": "string",
    "pause_vendor": False,
    "vendor_name": "string",
}
