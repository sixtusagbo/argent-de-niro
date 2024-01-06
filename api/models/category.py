#!/usr/bin/env python3
"""Categories model"""
from mongoengine import Document, StringField
from bson import json_util


class Category(Document):
    """Defines a Category"""

    name = StringField(required=True)

    meta = {
        "db_alias": "core",
        "collection": "categories",
    }

    def to_json(self):
        """Converts a Category instance to JSON"""
        data = self.to_mongo().to_dict()
        data["id"] = str(data["_id"])  # Convert ObjectId to string
        del data["_id"]

        return json_util.dumps(data)
