from constants import MONGO_URI, DB_NAME
import pymongo

client = pymongo.MongoClient(MONGO_URI)

# create database
db = client[DB_NAME]
