#!/usr/bin/env python3
"""User model"""

from mongoengine import DateField, Document, StringField
from bson import json_util
import json


class User(Document):
    """Defines a User"""

    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = StringField(required=True, unique=True)
    birth_date = DateField(required=True)
    profile_pic = StringField()
    country = StringField()
    timezone = StringField()
    currency = StringField()

    meta = {
        "db_alias": "core",
        "collection": "users",
    }

    def to_json(self):
        """Converts a User instance to JSON"""
        data = self.to_mongo().to_dict()
        # Convert ObjectId to string
        data["id"] = str(data["_id"])
        del data["_id"]
        del data["password"]

        # Convert date fields to string
        data["birth_date"] = data["birth_date"].isoformat()

        return json_util.dumps(data)

    def to_dict(self):
        """Converts this model to a python dictionary"""
        return json.loads(self.to_json())
