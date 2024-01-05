import sys
sys.path.append("..")

from fastapi import APIRouter
from .._country_codes import countries


router = APIRouter()

"""
Countries Code details
"""


@router.get("/countries_code/get")
async def get_countries_code():
    """
    list of names of all countries with their 2 letter code
    """
    return countries

