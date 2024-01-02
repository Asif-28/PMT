from bson.objectid import ObjectId


def validate_object(cls, v):
    # check if user_id is valid
    if v is not None:
        if not ObjectId.is_valid(v):
            raise ValueError("user_id is not valid")
    return v
